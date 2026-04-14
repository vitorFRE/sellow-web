import {
  IconCalendarEvent,
  IconChartBar,
  IconFileImport,
  IconHome,
  IconLayoutKanban,
  IconLifebuoy,
  IconPhoto,
  IconReceipt,
  IconSend,
  IconSettings,
  IconTemplate,
  IconUsers,
} from "@tabler/icons-react"

export const dashboardSidebarData = {
  user: {
    name: "Usuário",
    email: "contato@sellow.local",
    avatar: "",
  },
  navMain: [
    {
      title: "Início",
      url: "/dashboard",
      icon: <IconHome />,
      isActive: true,
    },
    {
      title: "Pipeline",
      url: "/dashboard/pipeline",
      icon: <IconLayoutKanban />,
    },
    {
      title: "Leads",
      url: "/dashboard/leads",
      icon: <IconUsers />,
    },
    {
      title: "Importar",
      url: "/dashboard/importar",
      icon: <IconFileImport />,
    },
    {
      title: "Follow-ups",
      url: "/dashboard/followups",
      icon: <IconCalendarEvent />,
    },
    {
      title: "Propostas",
      url: "/dashboard/propostas",
      icon: <IconReceipt />,
    },
    {
      title: "Relatório",
      url: "/dashboard/relatorio",
      icon: <IconChartBar />,
    },
  ],
  navSecondary: [
    {
      title: "Configurações",
      url: "/dashboard/configuracoes",
      icon: <IconSettings />,
    },
    {
      title: "Suporte",
      url: "#",
      icon: <IconLifebuoy />,
    },
    {
      title: "Enviar feedback",
      url: "#",
      icon: <IconSend />,
    },
  ],
  projects: [
    {
      name: "Templates",
      url: "/dashboard/templates",
      icon: <IconTemplate />,
    },
    {
      name: "Portfólio",
      url: "/dashboard/portfolio",
      icon: <IconPhoto />,
    },
  ],
  brandIcon: (
    <span className="text-sm font-semibold tracking-tight">S</span>
  ),
}
