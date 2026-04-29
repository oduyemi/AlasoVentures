"use client";
import {
  Box,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  Flex,
  Skeleton,
  Stack,
  Button,
  HStack,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Input,
  Select,
  Image,
  useToast,
  Checkbox,
} from "@chakra-ui/react";
import { useState } from "react";

export type Product = {
  id: string;
  name: string;
  imageUrl: string;
  category: "custom" | "fabrics" | "accessories";
  customType?: "bride" | "groom" | "couple" | null;
  isFlashSales: boolean;

  pricing?: {
    originalPrice: number;
    salePrice?: number;
  };

  inventory?: {
    quantity: number;
    salesOrderStatus: "instock" | "pending" | "sold";
  };

  createdAt: string;
};

type ProductForm = Partial<Product> & {
  imageFile?: File;

  subcategory?: {
    type?: "asooke" | "saki" | "kente" | "akwete";
    variant?: "cotton asooke" | "metallic asooke" | "supernet";
    style?: "monotone" | "two-tone";
  };

  sales?: {
    expiryDate?: Date;
  };
};


const categoryColor = (cat: Product["category"]) => {
  switch (cat) {
    case "custom":
      return "purple";
    case "fabrics":
      return "orange";
    default:
      return "gray.400";
  }
};

export const ProductsTable = ({
  products,
  loading,
  onDelete,
  onSave,
}: {
  products?: Product[];
  loading: boolean;
  onDelete: (id: string) => void;
  onSave: (product: Partial<Product>) => void;
}) => {
  const safeProducts = products ?? [];
  const toast = useToast();

  const {
    isOpen: isFormOpen,
    onOpen: onFormOpen,
    onClose: onFormClose,
  } = useDisclosure();

  const [editing, setEditing] = useState<Product | null>(null);
  const [form, setForm] = useState<ProductForm>({});

  // const openNew = () => {
  //   setEditing(null);
  //   setForm(prev => {
  //     if (!prev.pricing?.originalPrice) return prev;
    
  //     return {
  //       ...prev,
  //       pricing: {
  //         ...prev.pricing,
  //         salePrice: Number(e.target.value),
  //       },
  //     };
  //   });
  //   onFormOpen();
  // };

  const openNew = () => {
    setEditing(null);
    setForm({});
    onFormOpen();
  };

  const openEdit = (p: Product) => {
    setEditing(p);
    setForm(p);
    onFormOpen();
  };

  const handleSave = () => {
    onSave(form);

    toast({
      title: editing ? "Product updated" : "Product created",
      status: "success",
    });

    onFormClose();
  };

  const updatePricing = (updates: Partial<Product["pricing"]>) => {
    setForm(prev => ({
      ...prev,
      pricing: {
        ...prev.pricing,
        ...updates,
      } as Product["pricing"],
    }));
  };
  return (
    <Box
      bg="#111"
      border="1px solid"
      borderColor="whiteAlpha.200"
      borderRadius="2xl"
      p={5}
    >
      {/* Header */}
      <Flex justify="space-between" align="center" mb={4}>
        <Text fontWeight="600" color="white" fontSize="lg">
          Products
        </Text>

        <Button size="sm" colorScheme="yellow" onClick={openNew}>
          + New Product
        </Button>
      </Flex>

      {/* Loading */}
      {loading || !products ? (
        <Stack spacing={3}>
          <Skeleton height="40px" />
          <Skeleton height="40px" />
        </Stack>
      ) : safeProducts.length === 0 ? (
        <Flex
          direction="column"
          align="center"
          justify="center"
          py={16}
          textAlign="center"
          color="gray.200"
        >
          <Box fontSize="40px">🛍️</Box>
          <Text mt={3} fontSize="lg" color="gray.300">
            No products yet
          </Text>
          <Text fontSize="sm">
            Click "New Product" to start adding inventory.
          </Text>
        </Flex>
      ) : (
        <Box overflowX="auto">
          <Table size="sm">
            <Thead>
              <Tr>
                <Th>Product</Th>
                <Th>Category</Th>
                <Th>Price</Th>
                <Th>Stock</Th>
                <Th>Type</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>

            <Tbody>
              {safeProducts.map((p) => (
                <Tr key={p.id} _hover={{ bg: "whiteAlpha.50" }}>
                  {/* Product */}
                  <Td>
                    <HStack>
                      <Image
                        src={p.imageUrl}
                        boxSize="40px"
                        borderRadius="md"
                        objectFit="cover"
                      />
                      <Text>{p.name}</Text>
                    </HStack>
                  </Td>

                  {/* Category */}
                  <Td>
                    <Badge colorScheme={categoryColor(p.category)}>
                      {p.category}
                    </Badge>
                  </Td>

                  {/* Price */}
                  <Td>
                    {p.pricing?.salePrice ? (
                      <Text>
                        ₦{p.pricing.salePrice}{" "}
                        <Text as="span" color="gray.200" fontSize="sm">
                          (₦{p.pricing.originalPrice})
                        </Text>
                      </Text>
                    ) : (
                      <Text>₦{p.pricing?.originalPrice || "-"}</Text>
                    )}
                  </Td>

                  {/* Stock */}
                  <Td>
                    <Badge
                      colorScheme={
                        p.inventory?.salesOrderStatus === "sold"
                          ? "red"
                          : p.inventory?.salesOrderStatus === "pending"
                          ? "yellow"
                          : "yellow"
                      }
                    >
                      {p.inventory?.salesOrderStatus || "N/A"}
                    </Badge>
                  </Td>

                  {/* Flash */}
                  <Td>
                    {p.isFlashSales ? (
                      <Badge colorScheme="pink">Flash</Badge>
                    ) : (
                      <Badge>Normal</Badge>
                    )}
                  </Td>

                  {/* Actions */}
                  <Td>
                    <HStack>
                      <Button
                        size="xs"
                        onClick={() => openEdit(p)}
                      >
                        Edit
                      </Button>

                      <Button
                        size="xs"
                        colorScheme="red"
                        onClick={() => onDelete(p.id)}
                      >
                        Delete
                      </Button>
                    </HStack>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      )}

      {/* CREATE / EDIT MODAL */}
      <Modal isOpen={isFormOpen} onClose={onFormClose} size="lg">
        <ModalOverlay />
        <ModalContent bg="#1a1a1a" color="white">
            <ModalHeader>
            {editing ? "Edit Product" : "New Product"}
            </ModalHeader>
            <ModalCloseButton />

            <ModalBody pb={6}>
            <Stack spacing={4}>
                
                {/* NAME */}
                <Input
                placeholder="Product Name"
                value={form.name || ""}
                onChange={(e) =>
                    setForm({ ...form, name: e.target.value })
                }
                />

                {/* IMAGE UPLOAD */}
                <Input
                type="file"
                accept="image/*"
                onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;

                    const preview = URL.createObjectURL(file);

                    setForm({
                    ...form,
                    imageFile: file, 
                    imageUrl: preview, 
                    });
                }}
                />

                {/* PREVIEW */}
                {form.imageUrl && (
                <Image
                    src={form.imageUrl}
                    boxSize="100px"
                    borderRadius="md"
                    objectFit="cover"
                />
                )}

                {/* CATEGORY */}
                <Select
                placeholder="Category"
                value={form.category || ""}
                onChange={(e) =>
                    setForm({
                    ...form,
                    category: e.target.value as Product["category"],
                    subcategory: {},
                    customType: null,
                    })
                }
                >
                <option value="custom">Custom</option>
                <option value="fabrics">Fabrics</option>
                <option value="accessories">Accessories</option>
                </Select>

                {/* CUSTOM TYPE */}
                {form.category === "custom" && (
                <Select
                    placeholder="Custom Type"
                    value={form.customType || ""}
                    onChange={(e) =>
                    setForm({
                        ...form,
                        customType: e.target.value as any,
                    })
                    }
                >
                    <option value="bride">Bride</option>
                    <option value="groom">Groom</option>
                    <option value="couple">Couple</option>
                </Select>
                )}

                {/* FABRICS SUBCATEGORY */}
                {form.category === "fabrics" && (
                <>
                    <Select
                    placeholder="Fabric Type"
                    value={form.subcategory?.type || ""}
                    onChange={(e) =>
                        setForm({
                        ...form,
                        subcategory: {
                            ...form.subcategory,
                            type: e.target.value as any,
                        },
                        })
                    }
                    >
                    <option value="asooke">Aso-Oke</option>
                    <option value="saki">Saki</option>
                    <option value="kente">Kente</option>
                    <option value="akwete">Akwete</option>
                    </Select>

                    <Select
                    placeholder="Variant"
                    value={form.subcategory?.variant || ""}
                    onChange={(e) =>
                        setForm({
                        ...form,
                        subcategory: {
                            ...form.subcategory,
                            variant: e.target.value as any,
                        },
                        })
                    }
                    >
                    <option value="cotton asooke">Cotton Aso-Oke</option>
                    <option value="metallic asooke">Metallic Aso-Oke</option>
                    <option value="supernet">Supernet</option>
                    </Select>

                    {/* STYLE (only for metallic) */}
                    {form.subcategory?.variant === "metallic asooke" && (
                    <Select
                        placeholder="Style"
                        value={form.subcategory?.style || ""}
                        onChange={(e) =>
                        setForm({
                            ...form,
                            subcategory: {
                            ...form.subcategory,
                            style: e.target.value as any,
                            },
                        })
                        }
                    >
                        <option value="monotone">Monotone</option>
                        <option value="two-tone">Two-tone</option>
                    </Select>
                    )}
                </>
                )}

                {/* FLASH SALES TOGGLE */}
                <Checkbox
                isChecked={form.isFlashSales || false}
                onChange={(e) =>
                    setForm({
                    ...form,
                    isFlashSales: e.target.checked,
                    })
                }
                >
                Enable Flash Sale
                </Checkbox>

                {/* PRICING */}
                <Input
                placeholder="Original Price"
                type="number"
                value={form.pricing?.originalPrice || ""}
                onChange={(e) =>
                    setForm({
                    ...form,
                    pricing: {
                        ...form.pricing,
                        originalPrice: Number(e.target.value),
                    },
                    })
                }
                />

                {/* FLASH SALE FIELDS */}
                {form.isFlashSales && (
                <>
                    <Input
                      placeholder="Sale Price"
                      type="number"
                      value={form.pricing?.salePrice || ""}
                      // onChange={(e) =>
                      //   setForm(prev => ({
                      //     ...prev,
                      //     pricing: {
                      //       originalPrice: prev.pricing?.originalPrice ?? 0,
                      //       salePrice: Number(e.target.value),
                      //     },
                      //   }))
                      // }
                      onChange={(e) =>
                        updatePricing({ salePrice: Number(e.target.value) })
                      }
                    />

                    <Input
                    placeholder="Quantity"
                    type="number"
                    value={form.inventory?.quantity || ""}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        inventory: {
                          quantity: Number(e.target.value),
                          salesOrderStatus:
                            form.inventory?.salesOrderStatus || "instock",
                          },
                        })
                      }
                    />

                    <Input
                    type="datetime-local"
                    onChange={(e) =>
                        setForm({
                        ...form,
                        sales: {
                            expiryDate: new Date(e.target.value),
                        },
                        })
                    }
                    />
                </>
                )}

                {/* SAVE */}
                <Button colorScheme="yellow" onClick={handleSave}>
                {editing ? "Update Product" : "Create Product"}
                </Button>
            </Stack>
            </ModalBody>
        </ModalContent>
        </Modal>
    </Box>
  );
};