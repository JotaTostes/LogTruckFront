import { useState } from "react";
import { Plus } from "lucide-react";
import UsuarioForm from "./UsuarioForm";
import UsuarioTable from "./UsuarioTable";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "../../components/ui/Button";

export default function Usuarios() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Usuários</h1>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Novo Usuário
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <UsuarioForm onSuccess={() => setOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>
      <UsuarioTable />
    </div>
  );
}
