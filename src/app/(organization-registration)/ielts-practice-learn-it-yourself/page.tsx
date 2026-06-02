import { requireB2CPlan, type B2CPlanId } from "@/app/data/plans/b2c-plans";
import { getUserSession } from "@/lib/auth/session/check-auth";
import IELTSPracticeLearnItYourselfPage from "./_components/PracticeLearnItYourselfPage";

export default async function Page() {
    const planId: B2CPlanId = "b2c-30d";
    const plan = requireB2CPlan(planId);
    const session = await getUserSession();

    return (
        <>
            {/* below component is fully static */}
            <IELTSPracticeLearnItYourselfPage plan={plan} isUserLoggedIn={session?.role === "user"} />
        </>
    )
}
