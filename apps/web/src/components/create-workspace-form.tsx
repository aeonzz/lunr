import * as React from "react";
import { trpc } from "@/utils/trpc";
import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod/v4";

import { Button } from "./ui/button";
import { Card, CardContent, CardFooter } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

interface CreateWorkspaceFormProps {
  userId: string;
}

export default function CreateWorkspaceForm({
  userId,
}: CreateWorkspaceFormProps) {
  const navigate = useNavigate();

  const { mutateAsync, isError } = useMutation(
    trpc.workspace.create.mutationOptions({})
  );

  const form = useForm({
    defaultValues: {
      name: "",
      url: "",
    },
    onSubmit: async ({ value }) => {
      await mutateAsync(
        { ownerId: userId, name: value.name, slug: value.url },
        {
          onSuccess: ({ workspace }) => {
            navigate({
              to: "/$workspace/inbox",
              params: {
                workspace: workspace.slug,
              },
            });
            form.reset();
          },
          onError: (error) => {
            toast.error(error.message);
          },
        }
      );
    },
    validators: {
      onSubmit: z.object({
        name: z
          .string()
          .min(1, "Workspace name is required.")
          .max(8, "Cannot exceed 8 characters."),
        url: z
          .string()
          .min(1, "Workspace url is required.")
          .max(8, "Cannot exceed 8 characters."),
      }),
    },
  });

  return (
    <div className="flex min-h-screen w-screen flex-col items-center justify-center gap-4 p-20">
      <h1 className="text-xl font-medium">Create a new workspace</h1>
      <p className="text-muted-foreground max-w-sm text-center text-sm">
        Create a workspace to organize your projects and collaborate with your
        team.
      </p>
      <Card className="w-full max-w-[400px]">
        <CardContent>
          <form
            className="space-y-5"
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              void form.handleSubmit();
            }}
          >
            <div className="flex flex-col gap-4">
              <form.Field name="name">
                {(field) => (
                  <div className="flex flex-col gap-3">
                    <Label htmlFor={field.name}>Workspace Name</Label>
                    <Input
                      id={field.name}
                      name={field.name}
                      aria-invalid={field.state.meta.errors.length > 0}
                      disabled={form.state.isSubmitting}
                      type="name"
                      autoComplete="off"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    {field.state.meta.errors.map((error) => (
                      <p
                        key={error?.message}
                        className="text-destructive -mt-2 text-xs"
                      >
                        {error?.message}
                      </p>
                    ))}
                  </div>
                )}
              </form.Field>
              <form.Field name="url">
                {(field) => (
                  <div className="flex flex-col gap-3">
                    <div className="*:not-first:mt-2">
                      <Label htmlFor={field.name}>Workspace URL</Label>
                      <div className="relative">
                        <Input
                          id={field.name}
                          name={field.name}
                          type="text"
                          className="peer ps-17.5"
                          aria-invalid={field.state.meta.errors.length > 0}
                          disabled={form.state.isSubmitting}
                          value={field.state.value}
                          onChange={(e) => field.handleChange(e.target.value)}
                        />
                        <span className="text-muted-foreground pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-sm peer-disabled:opacity-50">
                          lunr.app/
                        </span>
                      </div>
                    </div>
                    {field.state.meta.errors.map((error) => (
                      <p
                        key={error?.message}
                        className="text-destructive -mt-2 text-xs"
                      >
                        {error?.message}
                      </p>
                    ))}
                  </div>
                )}
              </form.Field>
              <div className="mt-2">
                <form.Subscribe>
                  {(state) => (
                    <Button
                      variant="default"
                      className="w-full"
                      disabled={!state.canSubmit || state.isSubmitting}
                    >
                      {state.isSubmitting && (
                        <Loader2 className="animate-spin" />
                      )}
                      Create workspace
                    </Button>
                  )}
                </form.Subscribe>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
