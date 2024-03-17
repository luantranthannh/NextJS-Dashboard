import { query } from "@/lib/db";

export async function GET(request) {
    const users = await query({
        query: "SELECT * FROM users",
        values: [],
    });

    let data = JSON.stringify(users);
    return new Response(data, {
        status: 200,
    });
}

export async function POST(request) {
    const { name, email , role } = await request.json();
    const updateUsers = await query({
        query: "INSERT INTO users (name,email, type) VALUES (?,?,?)",
        values: [name, email, role],
    });
    const result = updateUsers.affectedRows;
    let message = "";
    if (result) {
        message = "success";
    } else {
        message = "error";
    }
    const user = {
        name:name,
        email: email,
        type:role,
    };
    return new Response(JSON.stringify({
        message: message,
        status: 200,
        product: user
    }));

    // try {
    //     const { name, email , role } = await request.json();
    //     const updateUsers = await query({
    //         query: "INSERT INTO users (name,email,role) VALUES (?,?,?)",
    //         values: [name, email, role],
    //     });
    //     const result = updateUsers.affectedRows;
    //     let message = "";
    //     if (result) {
    //         message = "success";
    //     } else {
    //         message = "error";
    //     }
    //     const user = {
    //         name:name,
    //         email: email,
    //     };
    //     return new Response(JSON.stringify({
    //         message: message,
    //         status: 200,
    //         product: user
    //     }));
    // } catch (error) {
    //     return new Response(JSON.stringify({
    //         status: 500,
    //         data: request
    //     }));
    // }
}

export async function PUT(request) {

    try {
        const { id, email } = await request.json();
        const updateProducts = await query({
            query: "UPDATE users SET email = ? WHERE id = ?",
            values: [email, id],
        });
        const result = updateProducts.affectedRows;
        let message = "";
        if (result) {
            message = "success";
        } else {
            message = "error";
        }
        const user = {
            id: id,
            email: email,
        };
        return new Response(JSON.stringify({
            message: message,
            status: 200,
            product: user
        }));
    } catch (error) {
        return new Response(JSON.stringify({
            status: 500,
            data: res
        }));
    }

}


export async function DELETE(request) {
    const { id } = await request.json();
        const deleteUser = await query({
            query: "DELETE FROM users WHERE id = ?",
            values: [id],
        });
        const result = deleteUser.affectedRows;
        let message = "";
        if (result) {
            message = "success";
        } else {
            message = "error";
        }
        const product = {
            id: id,
        };
        return new Response(JSON.stringify({
            message: message,
            status: 200,
            product: product
        }));

    // try {
    //     const { id } = await request.json();
    //     const deleteUser = await query({
    //         query: "DELETE FROM users WHERE id = ?",
    //         values: [id],
    //     });
    //     const result = deleteUser.affectedRows;
    //     let message = "";
    //     if (result) {
    //         message = "success";
    //     } else {
    //         message = "error";
    //     }
    //     const product = {
    //         id: id,
    //     };
    //     return new Response(JSON.stringify({
    //         message: message,
    //         status: 200,
    //         product: product
    //     }));
    // } catch (error) {
    //     return new Response(JSON.stringify({
    //         status: 500,
    //         data: res
    //     }));
    // }

}