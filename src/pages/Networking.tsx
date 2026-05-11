import { useState } from "react";
import { Link } from "react-router-dom";
import Icon from "@/components/ui/icon";

const ipTable = [
  {
    device: "HQ-RTR",
    ips: ["172.16.1.2/28", "192.168.100.1/27", "192.168.200.1/24", "192.168.99.1/29"],
    gateway: "172.16.1.1",
    color: "bg-blue-50 border-blue-200",
    badge: "bg-blue-100 text-blue-800",
  },
  {
    device: "BR-RTR",
    ips: ["172.16.2.2/28", "192.168.0.1/28"],
    gateway: "172.16.2.1",
    color: "bg-purple-50 border-purple-200",
    badge: "bg-purple-100 text-purple-800",
  },
  {
    device: "HQ-SRV",
    ips: ["192.168.100.2/27"],
    gateway: "192.168.100.1",
    color: "bg-green-50 border-green-200",
    badge: "bg-green-100 text-green-800",
  },
  {
    device: "HQ-CLI",
    ips: ["192.168.200.2/24"],
    gateway: "192.168.200.1",
    color: "bg-yellow-50 border-yellow-200",
    badge: "bg-yellow-100 text-yellow-800",
  },
  {
    device: "BR-SRV",
    ips: ["192.168.0.2/28"],
    gateway: "192.168.0.2",
    color: "bg-red-50 border-red-200",
    badge: "bg-red-100 text-red-800",
  },
];

const devices = [
  {
    id: "isp",
    name: "ISP",
    type: "linux",
    commands: [
      {
        title: "Назначение имени устройства",
        description: "Задаём hostname и применяем сразу",
        code: "hostnamectl set-hostname isp; exec bash",
        verify: "hostname",
        result: "isp",
      },
      {
        title: "Указать имя в файле конфигурации",
        description: "Открываем файл сети и указываем HOSTNAME=isp",
        code: "vim /etc/sysconfig/network",
        note: "В файле указать: HOSTNAME=isp",
      },
    ],
  },
  {
    id: "hq-rtr",
    name: "HQ-RTR",
    type: "router",
    commands: [
      {
        title: "Назначение имени и домена",
        description: "Переходим в привилегированный режим и настраиваем hostname + domain",
        code: `ecorouter>enable
ecorouter#configure terminal
ecorouter(config)#hostname hq-rtr
hq-rtr(config)#ip domain-name au-team.irpo
hq-rtr(config)#write memory`,
        verify: "hq-rtr#show hostname",
        verify2: "hq-rtr#show running-config | include domain-name",
        result: "hq-rtr\nip domain-name au-team.irpo",
      },
    ],
  },
  {
    id: "br-rtr",
    name: "BR-RTR",
    type: "router",
    commands: [
      {
        title: "Назначение имени и домена",
        description: "Аналогично HQ-RTR",
        code: `ecorouter>enable
ecorouter#configure terminal
ecorouter(config)#hostname br-rtr
br-rtr(config)#ip domain-name au-team.irpo
br-rtr(config)#write memory`,
        verify: "br-rtr#show hostname",
        result: "br-rtr\nip domain-name au-team.irpo",
      },
    ],
  },
  {
    id: "hq-srv",
    name: "HQ-SRV",
    type: "linux",
    commands: [
      {
        title: "Назначение имени устройства",
        description: "Задаём FQDN через hostnamectl",
        code: "hostnamectl set-hostname hq-srv.au-team.irpo; exec bash",
        note: "Также указать в /etc/sysconfig/network: HOSTNAME=hq-srv.au-team.irpo",
        verify: "hostname -f",
        result: "hq-srv.au-team.irpo",
      },
    ],
  },
  {
    id: "br-srv",
    name: "BR-SRV",
    type: "linux",
    commands: [
      {
        title: "Назначение имени устройства",
        description: "Аналогично HQ-SRV",
        code: "hostnamectl set-hostname br-srv.au-team.irpo; exec bash",
        verify: "hostname -f",
        result: "br-srv.au-team.irpo",
      },
    ],
  },
  {
    id: "hq-cli",
    name: "HQ-CLI",
    type: "gui",
    commands: [
      {
        title: "Назначение имени через ЦУС",
        description: "Открыть Центр Управления Системой → Сеть → Ethernet-интерфейсы",
        steps: [
          "Открыть меню приложений (кнопка ⊞ на панели)",
          'Найти "Центр управления системой (ЦУС)"',
          "Перейти в раздел Сеть → Ethernet-интерфейсы",
          'В поле "Имя компьютера" ввести: hq-cli.au-team.irpo',
          "Сохранить изменения",
        ],
        result: "hq-cli.au-team.irpo",
      },
    ],
  },
];

const networkInfo = [
  { vlan: "VLAN 100", name: "HQ-SRV", max: "не более 32 адресов", mask: "/27", example: "192.168.100.0/27" },
  { vlan: "VLAN 200", name: "HQ-CLI", max: "не менее 16 адресов", mask: "/24", example: "192.168.200.0/24" },
  { vlan: "VLAN 999", name: "Управление", max: "не более 8 адресов", mask: "/29", example: "192.168.99.0/29" },
  { vlan: "—", name: "BR-SRV", max: "не более 16 адресов", mask: "/28", example: "192.168.0.0/28" },
];

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <button
      onClick={handleCopy}
      className="ml-2 p-1 rounded text-neutral-400 hover:text-white transition-colors"
      title="Скопировать"
    >
      <Icon name={copied ? "Check" : "Copy"} size={14} />
    </button>
  );
}

function CodeBlock({ code }: { code: string }) {
  return (
    <div className="relative bg-neutral-900 rounded-lg p-4 mt-2 group">
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <CopyButton text={code} />
      </div>
      <pre className="text-green-400 text-sm font-mono whitespace-pre-wrap leading-relaxed">{code}</pre>
    </div>
  );
}

export default function Networking() {
  const [activeDevice, setActiveDevice] = useState("isp");
  const currentDevice = devices.find((d) => d.id === activeDevice)!;

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      {/* Header */}
      <header className="border-b border-neutral-800 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="text-neutral-400 hover:text-white transition-colors text-sm uppercase tracking-wide">
              Шпора.ру
            </Link>
            <span className="text-neutral-700">/</span>
            <span className="text-white text-sm uppercase tracking-wide">Сети DE26</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-neutral-500">
            <Icon name="Network" size={14} />
            <span>Базовая настройка устройств</span>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-10">

        {/* Title */}
        <div>
          <h1 className="text-3xl font-bold uppercase tracking-wide">Задание 1</h1>
          <p className="text-neutral-400 mt-2">Базовая настройка устройств — имена, IP-адреса, шлюзы</p>
        </div>

        {/* Requirements */}
        <section>
          <h2 className="text-lg font-semibold uppercase tracking-wide text-neutral-300 mb-4 flex items-center gap-2">
            <Icon name="ClipboardList" size={18} />
            Условия задания
          </h2>
          <ul className="space-y-2 text-neutral-300 text-sm">
            <li className="flex gap-2"><span className="text-blue-400 mt-1">•</span> Настроить имена устройств согласно топологии — использовать полное доменное имя (<span className="text-yellow-400 font-mono">au-team.irpo</span>)</li>
            <li className="flex gap-2"><span className="text-blue-400 mt-1">•</span> IP-адрес из приватного диапазона RFC1918 (10.x, 172.16-31.x, 192.168.x)</li>
            <li className="flex gap-2"><span className="text-blue-400 mt-1">•</span> Исключение: ISP — полное доменное имя не задаётся</li>
          </ul>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {networkInfo.map((n) => (
              <div key={n.vlan} className="bg-neutral-900 border border-neutral-800 rounded-lg p-3">
                <div className="text-xs text-neutral-500 mb-1">{n.vlan}</div>
                <div className="font-semibold text-white">{n.name}</div>
                <div className="text-xs text-neutral-400 mt-1">{n.max}</div>
                <div className="mt-2 flex items-center gap-2">
                  <span className="font-mono text-xs bg-neutral-800 px-2 py-0.5 rounded text-green-400">{n.mask}</span>
                  <span className="text-xs text-neutral-500">{n.example}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* IP Table */}
        <section>
          <h2 className="text-lg font-semibold uppercase tracking-wide text-neutral-300 mb-4 flex items-center gap-2">
            <Icon name="Table" size={18} />
            Таблица адресов (Таблица 2)
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-neutral-800">
                  <th className="text-left px-4 py-3 text-neutral-400 font-medium rounded-tl-lg">Устройство</th>
                  <th className="text-left px-4 py-3 text-neutral-400 font-medium">IP-адрес / маска</th>
                  <th className="text-left px-4 py-3 text-neutral-400 font-medium rounded-tr-lg">Шлюз по умолчанию</th>
                </tr>
              </thead>
              <tbody>
                {ipTable.map((row, i) => (
                  row.ips.map((ip, j) => (
                    <tr key={`${i}-${j}`} className="border-t border-neutral-800 hover:bg-neutral-900 transition-colors">
                      {j === 0 && (
                        <td
                          className="px-4 py-3 font-mono font-bold text-white"
                          rowSpan={row.ips.length}
                        >
                          <span className={`px-2 py-1 rounded text-xs ${row.badge}`}>
                            {row.device}
                          </span>
                        </td>
                      )}
                      <td className="px-4 py-3 font-mono text-green-400">{ip}</td>
                      {j === 0 && (
                        <td
                          className="px-4 py-3 font-mono text-blue-400"
                          rowSpan={row.ips.length}
                        >
                          {row.gateway}
                        </td>
                      )}
                    </tr>
                  ))
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Commands by device */}
        <section>
          <h2 className="text-lg font-semibold uppercase tracking-wide text-neutral-300 mb-4 flex items-center gap-2">
            <Icon name="Terminal" size={18} />
            Команды по устройствам
          </h2>

          <div className="flex flex-wrap gap-2 mb-6">
            {devices.map((d) => (
              <button
                key={d.id}
                onClick={() => setActiveDevice(d.id)}
                className={`px-4 py-2 rounded-lg text-sm font-mono font-medium transition-all ${
                  activeDevice === d.id
                    ? "bg-white text-neutral-900"
                    : "bg-neutral-800 text-neutral-400 hover:bg-neutral-700 hover:text-white"
                }`}
              >
                {d.name}
                <span className={`ml-2 text-xs opacity-60 ${activeDevice === d.id ? "text-neutral-600" : ""}`}>
                  {d.type === "router" ? "router" : d.type === "gui" ? "gui" : "linux"}
                </span>
              </button>
            ))}
          </div>

          <div className="space-y-6">
            {currentDevice.commands.map((cmd, i) => (
              <div key={i} className="bg-neutral-900 border border-neutral-800 rounded-xl p-5">
                <h3 className="font-semibold text-white mb-1">{cmd.title}</h3>
                {cmd.description && (
                  <p className="text-neutral-400 text-sm mb-3">{cmd.description}</p>
                )}

                {"steps" in cmd && cmd.steps ? (
                  <ol className="space-y-2 mt-3">
                    {cmd.steps.map((step, si) => (
                      <li key={si} className="flex gap-3 text-sm text-neutral-300">
                        <span className="flex-shrink-0 w-6 h-6 bg-neutral-800 rounded-full flex items-center justify-center text-xs text-neutral-400">
                          {si + 1}
                        </span>
                        {step}
                      </li>
                    ))}
                  </ol>
                ) : (
                  "code" in cmd && cmd.code && <CodeBlock code={cmd.code} />
                )}

                {"note" in cmd && cmd.note && (
                  <div className="mt-3 flex gap-2 text-xs text-yellow-400 bg-yellow-400/10 rounded-lg px-3 py-2">
                    <Icon name="AlertCircle" size={14} className="mt-0.5 flex-shrink-0" />
                    {cmd.note}
                  </div>
                )}

                {("verify" in cmd || "verify2" in cmd) && (
                  <div className="mt-4 space-y-2">
                    <div className="text-xs text-neutral-500 uppercase tracking-wide flex items-center gap-1">
                      <Icon name="CheckCircle" size={12} />
                      Проверка
                    </div>
                    {"verify" in cmd && cmd.verify && <CodeBlock code={cmd.verify} />}
                    {"verify2" in cmd && cmd.verify2 && <CodeBlock code={cmd.verify2} />}
                    {"result" in cmd && cmd.result && (
                      <div>
                        <div className="text-xs text-neutral-500 mb-1">Ожидаемый результат:</div>
                        <div className="bg-black rounded-lg p-3">
                          <pre className="text-green-300 text-sm font-mono">{cmd.result}</pre>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* RFC1918 Reference */}
        <section>
          <h2 className="text-lg font-semibold uppercase tracking-wide text-neutral-300 mb-4 flex items-center gap-2">
            <Icon name="BookOpen" size={18} />
            Приватные диапазоны RFC1918
          </h2>
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { range: "10.0.0.0 – 10.255.255.255", prefix: "10/8 prefix", note: "Класс A" },
                { range: "172.16.0.0 – 172.31.255.255", prefix: "172.16/12 prefix", note: "Класс B" },
                { range: "192.168.0.0 – 192.168.255.255", prefix: "192.168/16 prefix", note: "Класс C" },
              ].map((r) => (
                <div key={r.prefix} className="bg-neutral-800 rounded-lg p-3">
                  <div className="text-xs text-neutral-500 mb-1">{r.note}</div>
                  <div className="font-mono text-green-400 text-sm">{r.range}</div>
                  <div className="font-mono text-neutral-400 text-xs mt-1">({r.prefix})</div>
                </div>
              ))}
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
