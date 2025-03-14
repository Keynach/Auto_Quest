export const registerUser = async (userData) => {
    const endpoint = userData.tipo_usuario === "maestro"
        ? "http://localhost:8000/usuario/maestro/"
        : "http://localhost:8000/usuario/alumno/";

    try {
        const response = await fetch(endpoint, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.detail || "Error al registrar usuario");
        }

        return await response.json();
    } catch (error) {
        console.error("Error en el registro:", error);
        throw error;
    }
};
