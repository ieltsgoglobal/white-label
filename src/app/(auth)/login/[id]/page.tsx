import dynamic from 'next/dynamic';

const TeacherLogIn = dynamic(() => import('@/app/(auth)/login/_components/teacher-login/teacher-login'));
const StudentLogIn = dynamic(() => import('@/app/(auth)/login/_components/student-login/student-login'));
const PartnerLogin = dynamic(() => import('@/app/(auth)/login/_components/partner-login/admin-login'));


const loginComponents: Record<string, JSX.Element> = {
    teacher: <TeacherLogIn />,
    student: <StudentLogIn />,
    organization: <PartnerLogin />,
};

type Props = {
    params: {
        id: string;
    };
};

export default function LoginPage({ params }: Props) {
    const id = params.id

    if (!id || !(id in loginComponents)) {
        return <div>Invalid login type</div>;
    }

    return loginComponents[id];
}