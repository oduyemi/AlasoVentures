"use client";
import { useEffect, useState } from "react";
import { Box, Flex, Text, Tabs, TabList, TabPanels, Tab, TabPanel, useToast } from "@chakra-ui/react";
import { useAuth } from "@/app/context/auth.context";
import { ContactTable } from "@/components/Admin/ContactTable";
import { AppointmentTable } from "@/components/Admin/AppointmentTable";
import { ContactEntry } from "@/types/contact";
import { AppointmentEntry } from "@/types/appointment";


export default function Inbox() {
  const { user } = useAuth();
  const toast = useToast();
  const [loading, setLoading] = useState(true);
  const [contacts, setContacts] = useState<ContactEntry[]>([]);
  const [appointments, setAppointments] = useState<
    AppointmentEntry[]
  >([]);

  const fetchData = async () => {
    try {
      setLoading(true);

      const [contactRes, appointmentRes] =
        await Promise.all([
          fetch("/api/contact"),
          fetch("/api/appointment"),
        ]);

      const contactData = await contactRes.json();
      const appointmentData =
        await appointmentRes.json();

      setContacts(contactData.data || []);
      setAppointments(
        appointmentData.data || []
      );
    } catch {
      toast({
        title: "Failed to load communications.",
        status: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const updateContactStatus = async (
    id: string,
    status: "pending" | "treated"
  ) => {
    try {
      await fetch(`/api/contact/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({ status }),
      });

      toast({
        title: "Contact updated.",
        status: "success",
      });

      fetchData();
    } catch {
      toast({
        title: "Unable to update contact.",
        status: "error",
      });
    }
  };

  const deleteContact = async (
    id: string
  ) => {
    try {
      await fetch(`/api/contact/${id}`, {
        method: "DELETE",
      });

      toast({
        title: "Contact deleted.",
        status: "success",
      });

      fetchData();
    } catch {
      toast({
        title: "Unable to delete contact.",
        status: "error",
      });
    }
  };

  const updateAppointmentStatus = async (
    id: string,
    status: "pending" | "treated"
  ) => {
    try {
      await fetch(
        `/api/appointment/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            status,
          }),
        }
      );

      toast({
        title: "Appointment updated.",
        status: "success",
      });

      fetchData();
    } catch {
      toast({
        title:
          "Unable to update appointment.",
        status: "error",
      });
    }
  };

  const deleteAppointment = async (
    id: string
  ) => {
    try {
      await fetch(
        `/api/appointment/${id}`,
        {
          method: "DELETE",
        }
      );

      toast({
        title: "Appointment deleted.",
        status: "success",
      });

      fetchData();
    } catch {
      toast({
        title:
          "Unable to delete appointment.",
        status: "error",
      });
    }
  };

  return (
    <Box>
      {/* Header */}
      <Box
        px={{ base: 4, md: 6 }}
        py={{ base: 4, md: 5 }}
        borderBottom="1px solid"
        borderColor="whiteAlpha.200"
        bg="#111"
      >
        <Flex direction="column" gap={1}>
          <Text
            fontSize={{ base: "xl", md: "2xl" }}
            fontWeight="bold"
          >
            {user?.fname || "Admin"}
          </Text>

          <Text fontSize="sm" color="gray.400">
            Manage contact messages and appointment bookings from one place.
          </Text>
        </Flex>
      </Box>

      <Box p={{ base: 4, md: 6 }}>
        <Tabs variant="soft-rounded" colorScheme="purple">
          <TabList mb={6}>
            <Tab>Contact Messages</Tab>
            <Tab>Appointment Requests</Tab>
          </TabList>

          <TabPanels>
            <TabPanel px={0}>
              <ContactTable
                contacts={contacts}
                loading={loading}
                onUpdateStatus={
                  updateContactStatus
                }
                onDelete={deleteContact}
              />

            </TabPanel>

            <TabPanel px={0}>
              <AppointmentTable
                  appointments={
                    appointments
                  }
                  loading={loading}
                  onUpdateStatus={
                    updateAppointmentStatus
                  }
                  onDelete={
                    deleteAppointment
                  }
                />

            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Box>
  );
}