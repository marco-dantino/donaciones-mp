import {MercadoPagoConfig, Preference} from "mercadopago";
import {redirect} from "next/navigation";

import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Textarea} from "@/components/ui/textarea";
import {MP_ACCESS_TOKEN} from "@/lib/config";

const mercadopago = new MercadoPagoConfig({accessToken: MP_ACCESS_TOKEN!});

export default function HomePage() {
  async function donate(formData: FormData) {
    "use server";

    const preference = await new Preference(mercadopago).create({
      body: {
        items: [
          {
            id: "message",
            title: formData.get("menssage") as string,
            quantity: 1,
            unit_price: Number(formData.get("amount")),
          },
        ],
      },
    });

    redirect(preference.init_point!);
  }

  return (
    <form action={donate} className="m-auto grid max-w-96 gap-6 border p-6">
      <Label className="grid gap-2">
        <span>Valor</span>
        <Input name="amount" type="number" />
      </Label>
      <Label className="grid gap-2">
        <span>Tu mensaje en la donación</span>
        <Textarea name="menssage" />
      </Label>
      <Button type="submit">Enviar</Button>
    </form>
  );
}
