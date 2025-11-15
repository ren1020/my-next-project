import Sheet from "@/app/_components/Sheet";

type Proos = {
    children: React.ReactNode;
};

export default function RootLayout({ children }: Proos) {
    return <Sheet>{children}</Sheet>;
}