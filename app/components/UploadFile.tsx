"use client";

import { UploadButton } from "@/lib/uploadthing";
import { updateUserImage } from "../profile/actions";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <UploadButton
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          // Do something with the response
          const imageUrl = res[0].ufsUrl;

          updateUserImage(imageUrl);
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
        }}
      />
    </main>
  );
}
