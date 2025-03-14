export const login = async (email, password) => {
    const endpoint = "http://127.0.0.1:8000/usuario/login/";

    try {
        const response = await fetch(endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Error del servidor:", errorData);
            throw new Error(errorData.error || "Error al iniciar sesión");
        }

        return await response.json();
    } catch (error) {
        console.error("Error en el inicio de sesión:", error);
        throw error;
    }
};