"use client";
import {
  Box,
  Text,
  Flex,
  Button,
  Stack,
  Image,
  Input,
  Textarea,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  HStack,
} from "@chakra-ui/react";
import { useState } from "react";

type Slide = {
  id: string;
  imgSrc: string;
  title: string;
  description: string;
  ctaText?: string;
  ctaLink?: string;
};

type CTA = {
  id: string;
  img: string;
  label: string;
  title: string;
  buttonText: string;
  link: string;
};

export const HeroManager = ({
  slides = [],
  ctas = [],
  onSaveSlide,
  onDeleteSlide,
  onSaveCTA,
  onDeleteCTA,
}: any) => {
  const {
    isOpen,
    onOpen,
    onClose,
  } = useDisclosure();

  const [editingSlide, setEditingSlide] = useState<Slide | null>(null);
  const [form, setForm] = useState<any>({});

  const openNewSlide = () => {
    setEditingSlide(null);
    setForm({});
    onOpen();
  };

  const openEditSlide = (slide: Slide) => {
    setEditingSlide(slide);
    setForm(slide);
    onOpen();
  };

  const handleSave = () => {
    onSaveSlide(form);
    onClose();
  };

  return (
    <Box p={5} bg="#111" borderRadius="2xl">
      
      {/* HEADER */}
      <Flex justify="space-between" mb={4}>
        <Text fontSize="lg" fontWeight="600">
          Hero Section Manager
        </Text>

        <Button colorScheme="yellow" onClick={openNewSlide}>
          + New Slide
        </Button>
      </Flex>

      {/* SLIDES */}
      <Stack spacing={4}>
        {slides.length === 0 ? (
          <Text color="gray.400">No slides created yet</Text>
        ) : (
          slides.map((s: Slide) => (
            <Flex
              key={s.id}
              p={3}
              border="1px solid #333"
              borderRadius="lg"
              justify="space-between"
              align="center"
            >
              <HStack>
                <Image
                  src={s.imgSrc}
                  boxSize="70px"
                  borderRadius="md"
                  objectFit="cover"
                />
                <Box>
                  <Text fontWeight="600">{s.title}</Text>
                  <Text fontSize="sm" color="gray.400">
                    {s.description}
                  </Text>
                </Box>
              </HStack>

              <HStack>
                <Button size="xs" onClick={() => openEditSlide(s)}>
                  Edit
                </Button>
                <Button
                  size="xs"
                  colorScheme="red"
                  onClick={() => onDeleteSlide(s.id)}
                >
                  Delete
                </Button>
              </HStack>
            </Flex>
          ))
        )}
      </Stack>

      {/* SLIDE MODAL */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg="#1a1a1a">
          <ModalHeader color="white">
            {editingSlide ? "Edit Slide" : "New Slide"}
          </ModalHeader>
          <ModalCloseButton />

          <ModalBody pb={6} color="gray.300">
            <Stack spacing={3}>
              
              <Input
                placeholder="Title"
                value={form.title || ""}
                onChange={(e) =>
                  setForm({ ...form, title: e.target.value })
                }
              />

              <Textarea
                placeholder="Description"
                value={form.description || ""}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
              />

              <Input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;

                  const preview = URL.createObjectURL(file);

                  setForm({
                    ...form,
                    imgFile: file,
                    imgSrc: preview,
                  });
                }}
              />

              {form.imgSrc && (
                <Image src={form.imgSrc} boxSize="120px" />
              )}

              <Input
                placeholder="CTA Text"
                value={form.ctaText || ""}
                onChange={(e) =>
                  setForm({ ...form, ctaText: e.target.value })
                }
              />

              <Input
                placeholder="CTA Link"
                value={form.ctaLink || ""}
                onChange={(e) =>
                  setForm({ ...form, ctaLink: e.target.value })
                }
              />

              <Button colorScheme="yellow" onClick={handleSave}>
                Save Slide
              </Button>
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>


      <Box mt={10}>
        <Text fontSize="lg" fontWeight="600" mb={4}>
          Side Call-To-Actions
        </Text>

        <Stack spacing={4}>
          {ctas.map((c: CTA) => (
            <Flex
              key={c.id}
              p={3}
              border="1px solid #333"
              borderRadius="lg"
              justify="space-between"
              align="center"
            >
              <HStack>
                <Image src={c.img} boxSize="70px" borderRadius="md" />
                <Box>
                  <Text fontWeight="600">{c.label}</Text>
                  <Text fontSize="sm" color="gray.400">
                    {c.title}
                  </Text>
                </Box>
              </HStack>

              <HStack>
                <Button size="xs" onClick={() => onSaveCTA(c)}>
                  Edit
                </Button>

                <Button
                  size="xs"
                  colorScheme="red"
                  onClick={() => onDeleteCTA(c.id)}
                >
                  Delete
                </Button>
              </HStack>
            </Flex>
          ))}
        </Stack>
      </Box>
    </Box>
  );
};