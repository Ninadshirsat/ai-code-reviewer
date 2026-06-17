import React from "react";
import Image from "next/image";
import type { Metadata } from "next";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldSet,
} from "@/components/ui/field";
import { GithubSignInForm } from "@/features/auth/components/github-sign-form";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to AI Code Reviewer with your Github account",
};

type SignInPageProps = {
  searchParams: Promise<{ callbackUrl?: string }>;
};

const SignInPage = async ({ searchParams }: SignInPageProps) => {
  const { callbackUrl } = await searchParams;
  return (
    <Card className="border-border/80 shadow-sm">
      <CardHeader className="items-center text-center">
        <div className="flex justify-center">
          <Image
            src="/logo-1.png"
            alt="AI Code Reviewer Logo"
            width={100}
            height={100}
            priority
            className="text-foreground"
          />
        </div>
        <CardTitle className="text-base">Sign In</CardTitle>
        <CardDescription className="text-sm">
          Sign in with Github to access AI Code Reviewer and start reviewing
          your code with the power of AI.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <FieldSet>
          <FieldGroup>
            <Field>
              <GithubSignInForm callbackUrl={callbackUrl} />
              <FieldDescription className="text-center">
                We do not store any of your data. We only use your Github
                account to authenticate you and access your repositories for
                code review. Your privacy is our top priority.
              </FieldDescription>
            </Field>
          </FieldGroup>
        </FieldSet>
      </CardContent>
    </Card>
  );
};

export default SignInPage;
