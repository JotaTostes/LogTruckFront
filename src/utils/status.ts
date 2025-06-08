export const getStatusText = (status: number) => {
  switch (status) {
    case 1:
      return "Planejada";
    case 2:
      return "Em Andamento";
    case 3:
      return "Concluida";
    case 4:
      return "Cancelada";
    default:
      return "Desconhecido";
  }
};

export const getStatusColor = (status: number) => {
  switch (status) {
    case 1:
      return "bg-yellow-500";
    case 2:
      return "bg-blue-500";
    case 3:
      return "bg-green-500";
    case 4:
      return "bg-red-500";
    default:
      return "bg-gray-500";
  }
};

export const getTextTipoCusto = (tipoCusto: number) => {
  switch (tipoCusto) {
    case 1:
      return "Combustível";
    case 2:
      return "Pernoite";
    case 3:
      return "Pedágio";
    case 4:
      return "Manutenção";
    case 99:
      return "Outros";
    default:
      return "Desconhecido";
  }
};

export const getTextRoleUsuario = (role: number) => {
  switch (role) {
    case 1:
      return "Administrador";
    case 2:
      return "Motorista";
    case 3:
      return "Operador";
    default:
      return "Desconhecido";
  }
};

export const getIdRoleUsuario = (role: string) => {
  switch (role) {
    case "Administrador":
      return 1;
    case "Motorista":
      return 2;
    case "Operador":
      return 3;
    default:
      return 0;
  }
};
