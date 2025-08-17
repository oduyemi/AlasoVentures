import { Suspense } from "react";
import { Shop } from "@/components/Shop";



export default function shop () {
    return (
    <Suspense fallback={<div>Loading shop...</div>}>
      <Shop />
    </Suspense>
  );
}