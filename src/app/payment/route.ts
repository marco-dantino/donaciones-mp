import {revalidatePath} from "next/cache";
import {MercadoPagoConfig, Payment} from "mercadopago";
import {createClient} from "@supabase/supabase-js";

import {MP_ACCESS_TOKEN, NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SECRET} from "@/lib/config";

const mercadopago = new MercadoPagoConfig({accessToken: MP_ACCESS_TOKEN!});
const supabase = createClient(NEXT_PUBLIC_SUPABASE_URL!, SUPABASE_SECRET!);

export async function POST(request: Request) {
  const body: {data: {id: string}} = await request.json();

  const payment = await new Payment(mercadopago).get({id: body.data.id});

  const donation = {
    id: payment.id,
    amount: payment.transaction_amount,
    message: payment.description,
  };

  const result = await supabase.from("donations").insert(donation);

  console.log("result:", result);

  return Response.json({success: true});
}

///PRUEBA
export async function GET() {
  const donation = {
    id: 123,
    amount: 1000,
    message: "PRUEBA",
  };

  const result = await supabase.from("donations").insert(donation);

  console.log("result:", result);

  return Response.json({success: true});
}

/*export async function POST(request: NextRequest) {
  const body: unknow = await request.json();

  console.log("body:", body);

  return Response.json({success: true});
}*/
