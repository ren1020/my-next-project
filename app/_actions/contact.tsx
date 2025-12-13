"use server";

function valibateEmail(email: string) {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
}

export async function createContactData(_prevent: any, formData: FormData) {
    const rawData = {
        lastname: formData.get("lastname") as string,
        firstname: formData.get("firstname") as string,
        company: formData.get("company") as string,
        email: formData.get("email") as string,
        message: formData.get("message") as string,
    };
    if (!rawData.lastname) {
        return {
            status : "error",
            message: "姓を入力してください。",
        };
    }
    if (!rawData.firstname) {
        return {
            status : "error",
            message: "名を入力してください。",
        };
    }
    if (!rawData.email) {
        return {
            status : "error",
            message: "メールアドレスを入力してください。",
        };
    }
    if (!valibateEmail(rawData.email)) {
        return {
            status : "error",
            message: "メールアドレスの形式が誤っています。",
        };
    }
    if (!rawData.message) {
        return {
            status : "error",
            message: "メッセージを入力してください。",
        };
    }
    const result = await fetch(
        "https://api.hsforms.com/submissions/v3integration/submit/${process.env.HUBSPOT_PORTAL_ID}/${process.env.HUBSPOT_FORM_ID}",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                fields: [
                    {
                        objectTypeID: "0-1",
                        name: "lastname",
                        value: rawData.lastname,
                    },
                    {
                        objectTypeID: "0-1",
                        name: "firstname",
                        value: rawData.firstname,
                    },
                    {
                        objectTypeID: "0-1",
                        name: "company",
                        value: rawData.company,
                    },
                    {
                        objectTypeID: "0-1",
                        name: "email",
                        value: rawData.email,
                    },
                    {
                        objectTypeID: "0-1",
                        name: "message",
                        value: rawData.message,
                    },
                ],
             }),
            },
        );

        try {
            await result.json();
        } catch (e) {
            console.log(e);
            return {
                status : "error",
                message: "お問い合わせに失敗しました。",
            };
        }
    return { status: "success", message: "OK" };
}