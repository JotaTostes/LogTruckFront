export interface ApiResponse<T> {
  success: boolean; // Indica se a operação foi bem-sucedida
  statusCode: number; // Código de status HTTP
  content?: T; // Dados retornados em caso de sucesso
  errors?: string[]; // Lista de mensagens de erro em caso de falha
}
