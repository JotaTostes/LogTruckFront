import { useState } from "react";
import { Plus } from "lucide-react";
import UsuarioForm from "./UsuarioForm";
import UsuarioTable from "./UsuarioTable";
import { MTTypography as Typography } from "../../components/ui/mt/MTTypography";
import { Dialog, DialogHeader, DialogBody } from "../../components/ui/Dialog";
import { Button } from "../../components/ui/Button";

export default function Usuarios() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(!open);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <Typography variant="h2" color="blue-gray" className="font-bold">
          Usuários
        </Typography>

        <Button onClick={handleOpen} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Novo Usuário
        </Button>
      </div>

      <UsuarioTable />

      {/* Dialog Modal */}
      <Dialog
        open={open}
        handler={handleOpen}
        size="md"
        placeholder=""
        onResize={() => {}}
        onResizeCapture={() => {}}
        onPointerEnterCapture={() => {}}
        onPointerLeaveCapture={() => {}}
        className="bg-white"
      >
        <DialogHeader className="pb-2">
          <Typography variant="h4" color="blue-gray">
            Novo Usuário
          </Typography>
        </DialogHeader>

        <DialogBody className="px-6 py-4">
          <UsuarioForm onSuccess={() => setOpen(false)} />
        </DialogBody>
      </Dialog>
    </div>
  );
}
