"use client";
import {
  Box,
  Text,
  Stack,
  Button,
  Divider,
} from "@chakra-ui/react";
import { usePathname, useRouter } from "next/navigation";
import {
  FiHome,
  FiFileText,
  FiCalendar,
  FiSettings,
  FiUser,
} from "react-icons/fi";

interface SidebarProps {
  logoutAdmin: () => Promise<void>;
}

export function Sidebar({ logoutAdmin }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const isActive = (path: string) => pathname.startsWith(path);

  const menu = [
    {
      label: "Dashboard",
      path: "/admin",
      icon: <FiHome />,
    },
    {
      label: "Blog",
      path: "/admin/bloguer",
      icon: <FiFileText />,
    },
    {
      label: "Events",
      path: "/admin/evenements",
      icon: <FiCalendar />,
    },
    {
      label: "Admins",
      path: "/admin/create-admin",
      icon: <FiSettings />,
    },
    {
      label: "Administrators",
      path: "/admin/administrateurs",
      icon: <FiSettings />,
    },
    {
      label: "My Profile",
      path: "/admin/profil",
      icon: <FiUser />,
    },
  ];

  return (
    <Box className="w-[260px] bg-slate-800 text-white p-6 flex flex-col">
      {/* Title */}
      <Text fontSize="lg" fontWeight="800" mb={6}>
        Administration
      </Text>

      {/* Menu */}
      <Stack spacing={2}>
        {menu.map((item) => (
          <Button
            key={item.path}
            leftIcon={item.icon}
            onClick={() => router.push(item.path)}
            justifyContent="flex-start"
            variant="ghost"
            className={`rounded-lg px-3 py-2 text-left ${
              isActive(item.path)
                ? "bg-slate-700"
                : "hover:bg-slate-700"
            }`}
          >
            {item.label}
          </Button>
        ))}
      </Stack>

      {/* Spacer */}
      <Box flex="1" />

      {/* Divider */}
      <Divider borderColor="whiteAlpha.300" my={4} />

      {/* Logout */}
      <Button
        variant="outline"
        colorScheme="red"
        onClick={logoutAdmin}
        mb={3}
      >
        Logout
      </Button>

      {/* Footer */}
      <Text fontSize="xs" opacity={0.6}>
        © 2026 Orphanage
      </Text>
    </Box>
  );
}