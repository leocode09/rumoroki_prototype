import { SignInButton } from "@/components/auth/sign-in-button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Card>
        <CardContent>
            <CardTitle>
                Join Liger
                </CardTitle>
          <SignInButton />
        </CardContent>
      </Card>
    </div>
  );
}
