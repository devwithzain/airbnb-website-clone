"use client";
import { useCallback } from "react";
import { login } from "@/app/actions";
import { toast } from "react-hot-toast";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";
import { AiFillGithub } from "react-icons/ai";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginFormSchema, TloginFormData } from "@/types";
import { useLoginModal, useRegisterModal } from "@/app/hooks";
import { Modal, Input, Heading, Button } from "@/app/components";

export default function LoginModal() {
	const router = useRouter();
	const loginModal = useLoginModal();
	const registerModal = useRegisterModal();

	const {
		register,
		reset,
		handleSubmit,
		formState: { isSubmitting, errors },
	} = useForm<TloginFormData>({
		resolver: zodResolver(loginFormSchema),
	});

	const onSubmits = async (data: TloginFormData) => {
		const response = await login(data);
		if (response?.error) {
			toast.error(response.error);
			reset();
		}
		if (response?.success) {
			toast.success(response.success);
			router.refresh();
		}
	};

	const onToggle = useCallback(() => {
		loginModal.onClose();
		registerModal.onOpen();
	}, [loginModal, registerModal]);

	const bodyContent = (
		<div className="flex flex-col gap-4">
			<Heading
				title="Welcome back"
				subtitle="Login to your account!"
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
      text-neutral-500 text-center mt-4 font-light">
				<p>
					First time using Airbnb?
					<span
						onClick={onToggle}
						className="
              text-neutral-800
              cursor-pointer 
              hover:underline
            ">
						{" "}
						Create an account
					</span>
				</p>
			</div>
		</div>
	);

	return (
		<Modal
			disabled={isSubmitting}
			isOpen={loginModal.isOpen}
			title="Login"
			actionLabel="Continue"
			onClose={loginModal.onClose}
			onSubmit={handleSubmit(onSubmits)}
			body={bodyContent}
			footer={footerContent}
		/>
	);
}
