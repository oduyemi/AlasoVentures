"use client";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Image,
  Badge,
  Heading,
  Text,
} from "@chakra-ui/react";

interface Post {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  content?: string;
  category: string;
  date: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  post: Post | null;
}

export const BlogDialog = ({ isOpen, onClose, post }: Props) => {
  if (!post) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="4xl"
      motionPreset="slideInBottom"
      isCentered
      scrollBehavior="inside"
    >
      <ModalOverlay />

      <ModalContent
        bg="gray.900"
        color="white"
        rounded="2xl"
        overflow="hidden"
      >
        <ModalHeader p={0}>
          <Image
            src={post.image}
            alt={post.title}
            w="full"
            h="280px"
            objectFit="cover"
          />
        </ModalHeader>

        <ModalCloseButton />

        <ModalBody p={8}>
          <Badge bg="#C28840" mb={3}>
            {post.category}
          </Badge>

          <Heading mb={3}>{post.title}</Heading>

          <Text fontSize="sm" color="gray.400" mb={6}>
            {post.date}
          </Text>

          <Text lineHeight="tall" color="gray.400">
            {post.content ?? post.excerpt}
          </Text>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};