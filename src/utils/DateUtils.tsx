// Função para converter uma data para uma string formatada com hora, minuto e segundo
function formatDateTime(date: Date, locale: string): string {
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    };
    return new Intl.DateTimeFormat(locale, options).format(date);
  }
  
  // Exemplo de uso
  const userLocale = 'pt-BR'; // A região do usuário pode ser obtida a partir de suas configurações ou preferências
  const date = new Date(); // A data que você deseja formatar
  
  const formattedDateTime = formatDateTime(date, userLocale);
  console.log(formattedDateTime); // Exemplo de resultado: "18 de julho de 2023, 12:34:56" (para pt-BR)
  