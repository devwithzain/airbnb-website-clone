"use client";

import { useCallback } from "react";
import { toast } from "react-hot-toast";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { useForm } from "react-hook-form";
import { registerData } from "@/app/actions";
import { AiFillGithub } from "react-icons/ai";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLoginModal, useRegisterModal } from "@/app/hooks";
import { registerFormSchema, TregisterFormData } from "@/types";
import { Modal, Input, Heading, Button } from "@/app/components";

export default function RegisterModal() {
	const loginModal = useLoginModal();
	const registerModal = useRegisterModal();

	const {
		register,
		reset,
		handleSubmit,
		formState: { isSubmitting, errors },
	} = useForm<TregisterFormData>({
		resolver: zodResolver(registerFormSchema),
	});

	const onSubmits = async (data: TregisterFormData) => {
		const response = await registerData(data);
		if (response.error) {
			toast.error(response.error);
			reset();
		}
		if (response.success) {
			toast.success(response.success);
			registerModal.onClose();
			loginModal.onOpen();
		}
	};

	const onToggle = useCallback(() => {
		registerModal.onClose();
		loginModal.onOpen();
	}, [registerModal, loginModal]);

	const bodyContent = (
		<div className="flex flex-col gap-4">
			<Heading
				title="Welcome to Airbnb"
				subtitle="Create an account!"
			/>
			<Input
				id="email"
				label="Email"
				disabled={isSubmitting}
				register={register}
				errors={errors}
				required
			/>
			{errors.email && (
				<span className="text-red-500 text-sm">{errors.email.message}</span>
			)}
			<Input
				id="name"
				label="Name"
				disabled={isSubmitting}
				register={register}
				errors={errors}
				required
			/>
			{errors.name && (
				<span className="text-red-500 text-sm">{errors.name.message}</span>
			)}
			<Input
				id="password"
				label="Password"
				type="password"
				disabled={isSubmitting}
				register={register}
				errors={errors}
				required
			/>
			{errors.password && (
				<span className="text-red-500 text-sm">{errors.password.message}</span>
			)}
		</div>
	);

	const footerContent = (
		<div className="flex flex-col gap-4 mt-3">
			<hr />
			<Button
				outline
				label="Continue with Google"
				icon={FcGoogle}
				onClick={() => signIn("google")}
			/>
			<Button
				outline
				label="Continue with Github"
				icon={AiFillGithub}
				onClick={() => signIn("github")}
			/>
			<div
				className="
          text-neutral-500 
          text-center 
          mt-4 
          font-light
        ">
				<p>
					Already have an account?
					<span
						onClick={onToggle}
						className="
              text-neutral-800
              cursor-pointer 
              hover:underline
            ">
						Log in
					</span>
				</p>
			</div>
		</div>
	);

	return (
		<Modal
			disabled={isSubmitting}
			isOpen={registerModal.isOpen}
			title="Register"
			actionLabel="Continue"
			onClose={registerModal.onClose}
			onSubmit={handleSubmit(onSubmits)}
			body={bodyContent}
			footer={footerContent}
		/>
	);
}
