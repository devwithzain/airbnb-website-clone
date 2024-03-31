"use client";
import Image from "next/image";
import { useCallback } from "react";
import { TImageUploadProps } from "@/export";
import { TbPhotoPlus } from "react-icons/tb";
import { CldUploadWidget } from "next-cloudinary";

declare global {
	var cloudinary: any;
}

export default function ImageUpload({ onChange, value }: TImageUploadProps) {
	const handleUpload = useCallback(
		(result: any) => {
			onChange(result.info.secure_url);
		},
		[onChange],
	);

	return (
		<CldUploadWidget
			onSuccess={handleUpload}
			uploadPreset="ppjkudj6"
			options={{
				maxFiles: 1,
			}}>
			{({ open }) => {
				return (
					<div
						onClick={() => open?.()}
						className="
              relative
              cursor-pointer
              hover:opacity-70
              transition
              border-dashed 
              border-2 
              p-20 
              border-neutral-300
              flex
              flex-col
              justify-center
              items-center
              gap-4
              text-neutral-600
            ">
						<TbPhotoPlus size={50} />
						<div className="font-semibold text-lg">Click to upload</div>
						{value && (
							<div
								className="
              absolute inset-0 w-full h-full">
								<Image
									fill
									style={{ objectFit: "cover" }}
									src={value}
									alt="House"
								/>
							</div>
						)}
					</div>
				);
			}}
		</CldUploadWidget>
	);
}
