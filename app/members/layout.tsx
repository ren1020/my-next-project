import Sheet from "@/app/_components/Sheet";
import Hero from "@/app/_components/Hero";

type Proos = {
    children: React.ReactNode;
};

export default function RootLayout({ children }: Proos) {
    return (
        <>
          <Hero title="Members" sub="メンバー" />
          <Sheet>{children}</Sheet>
        </>
    );
}