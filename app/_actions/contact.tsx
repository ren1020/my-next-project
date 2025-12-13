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

    return { status: "success", message: "OK" };
}