export const isPlacaMercosul = (placa: string): boolean => {
  const regexMercosul = /^[A-Z]{3}[0-9][A-Z][0-9]{2}$/;
  return regexMercosul.test(placa);
};

export const isPlacaAntiga = (placa: string): boolean => {
  const regexAntiga = /^[A-Z]{3}[0-9]{4}$/;
  return regexAntiga.test(placa);
};

export const formatarPlaca = (placa: string): string => {
  // Remove todos os caracteres não alfanuméricos
  const placaLimpa = placa.replace(/[^A-Za-z0-9]/g, "").toUpperCase();

  if (placaLimpa.length > 7) return placaLimpa.slice(0, 7);

  // Verifica se é placa Mercosul
  if (isPlacaMercosul(placaLimpa)) {
    return `${placaLimpa.slice(0, 3)}-${placaLimpa.slice(3)}`;
  }

  // Verifica se é placa antiga
  if (isPlacaAntiga(placaLimpa)) {
    return `${placaLimpa.slice(0, 3)}-${placaLimpa.slice(3)}`;
  }

  return placaLimpa;
};

export const validarPlaca = (placa: string): boolean => {
  const placaLimpa = placa.replace(/[^A-Za-z0-9]/g, "").toUpperCase();
  return isPlacaMercosul(placaLimpa) || isPlacaAntiga(placaLimpa);
};

export const getTipoPlaca = (
  placa: string
): "MERCOSUL" | "ANTIGA" | "INVÁLIDA" => {
  const placaLimpa = placa.replace(/[^A-Za-z0-9]/g, "").toUpperCase();

  if (isPlacaMercosul(placaLimpa)) return "MERCOSUL";
  if (isPlacaAntiga(placaLimpa)) return "ANTIGA";
  return "INVÁLIDA";
};

export const formatarCPF = (cpf: string | null | undefined): string => {
  // Verifica se o CPF é válido (não é null, undefined ou vazio)
  if (!cpf || typeof cpf !== "string") {
    return "";
  }

  // Remove todos os caracteres não numéricos
  const cpfLimpo = cpf.replace(/\D/g, "");

  // Se não há dígitos, retorna vazio
  if (!cpfLimpo) {
    return "";
  }

  // Limita o tamanho para 11 dígitos
  const cpfTruncado = cpfLimpo.slice(0, 11);

  // Aplica a máscara conforme o tamanho
  if (cpfTruncado.length <= 3) {
    return cpfTruncado;
  }
  if (cpfTruncado.length <= 6) {
    return `${cpfTruncado.slice(0, 3)}.${cpfTruncado.slice(3)}`;
  }
  if (cpfTruncado.length <= 9) {
    return `${cpfTruncado.slice(0, 3)}.${cpfTruncado.slice(
      3,
      6
    )}.${cpfTruncado.slice(6)}`;
  }
  return `${cpfTruncado.slice(0, 3)}.${cpfTruncado.slice(
    3,
    6
  )}.${cpfTruncado.slice(6, 9)}-${cpfTruncado.slice(9)}`;
};

// Versão alternativa mais robusta com validação de tipo
export const formatarCPFSeguro = (cpf: any): string => {
  try {
    // Converte para string se for número
    const cpfString = cpf?.toString() || "";

    // Se é uma string vazia, retorna vazio
    if (!cpfString.trim()) {
      return "";
    }

    // Remove todos os caracteres não numéricos
    const cpfLimpo = cpfString.replace(/\D/g, "");

    // Se não há dígitos, retorna vazio
    if (!cpfLimpo || cpfLimpo.length === 0) {
      return "";
    }

    // Limita o tamanho para 11 dígitos
    const cpfTruncado = cpfLimpo.slice(0, 11);

    // Aplica a máscara conforme o tamanho
    if (cpfTruncado.length <= 3) {
      return cpfTruncado;
    }
    if (cpfTruncado.length <= 6) {
      return `${cpfTruncado.slice(0, 3)}.${cpfTruncado.slice(3)}`;
    }
    if (cpfTruncado.length <= 9) {
      return `${cpfTruncado.slice(0, 3)}.${cpfTruncado.slice(
        3,
        6
      )}.${cpfTruncado.slice(6)}`;
    }
    return `${cpfTruncado.slice(0, 3)}.${cpfTruncado.slice(
      3,
      6
    )}.${cpfTruncado.slice(6, 9)}-${cpfTruncado.slice(9)}`;
  } catch (error) {
    console.warn("Erro ao formatar CPF:", error, "Valor recebido:", cpf);
    return "";
  }
};

export const validarCPF = (cpf: string): boolean => {
  const cpfLimpo = cpf.replace(/\D/g, "");

  if (cpfLimpo.length !== 11) return false;

  // Verifica se todos os dígitos são iguais
  if (/^(\d)\1{10}$/.test(cpfLimpo)) return false;

  // Validação dos dígitos verificadores
  let soma = 0;
  let resto;

  for (let i = 1; i <= 9; i++) {
    soma += parseInt(cpfLimpo.substring(i - 1, i)) * (11 - i);
  }

  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpfLimpo.substring(9, 10))) return false;

  soma = 0;
  for (let i = 1; i <= 10; i++) {
    soma += parseInt(cpfLimpo.substring(i - 1, i)) * (12 - i);
  }

  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpfLimpo.substring(10, 11))) return false;

  return true;
};

export const formatarDataISO = (dataISO: string): string => {
  try {
    if (!dataISO) return "-";

    // Parse the ISO date string
    const data = new Date(dataISO);

    // Check if date is valid
    if (isNaN(data.getTime())) return "-";

    // Format to dd/MM/yyyy
    const dia = data.getDate().toString().padStart(2, "0");
    const mes = (data.getMonth() + 1).toString().padStart(2, "0");
    const ano = data.getFullYear();

    return `${dia}/${mes}/${ano}`;
  } catch (error) {
    console.log("Erro ao formatar data:", error);
    return "-";
  }
};

export const formatarTelefone = (value: string): string => {
  const cleaned = value.replace(/\D/g, "");
  const truncated = cleaned.substring(0, 11);

  if (truncated.length <= 2) {
    return truncated;
  }
  if (truncated.length <= 3) {
    return `(${truncated.substring(0, 2)})${truncated.substring(2)}`;
  }
  if (truncated.length <= 6) {
    return `(${truncated.substring(0, 2)})${truncated.substring(2)}`;
  }
  if (truncated.length <= 10) {
    // Telefone fixo: (XX)XXXX-XXXX
    return `(${truncated.substring(0, 2)})${truncated.substring(
      2,
      6
    )}-${truncated.substring(6)}`;
  }
  if (truncated.length === 11) {
    // Celular: (XX)9XXXX-XXXX
    return `(${truncated.substring(0, 2)})${truncated.substring(
      2,
      3
    )}${truncated.substring(3, 7)}-${truncated.substring(7)}`;
  }

  return truncated;
};
