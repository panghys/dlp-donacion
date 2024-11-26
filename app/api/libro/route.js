export async function GET(params){
    const isbn=params.url.split("?")[1].split("=")[1];
    const url=`http://openlibrary.org/api/volumes/brief/isbn/${isbn}.json`;
    const res=await fetch(url);
    const data=await res.json();
    return Response.json(data)
}


export async function POST(req) {
    try {
        const body = await req.json();
        const apiUrl = 'https://dlp-api.vercel.app/donar';

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            const errorText = await response.text();
            return new Response(
                JSON.stringify({ message: `Error en la API: ${response.status}`, error: errorText }),
                { status: response.status }
            );
        }

        const result = await response.json();
        return new Response(JSON.stringify(result), { status: 200 });

    } catch (error) {
        console.error('Error en la API interna:', error);
        
        return new Response(
            JSON.stringify({ message: 'Error interno del servidor', error: error.message }),
            { status: 500 }
        );
    }
}

