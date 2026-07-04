import {
  IconFileImport,
  IconHome,
  IconLayoutKanban,
  IconMessageCircle,
  IconPhoto,
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
  ],
  navImport: [
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
  ],
  navSecondary: [
    {
      title: "Feedback",
      icon: <IconMessageCircle />,
    },
    {
      title: "Configurações",
      url: "/dashboard/configuracoes",
      icon: <IconSettings />,
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
  brandIcon: <span className="text-sm font-semibold tracking-tight">S</span>,
}
