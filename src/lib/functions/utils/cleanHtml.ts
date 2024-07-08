function escapeHtml(text: string) {
     const map: { [key: string]: string } = {
          '&': '&amp;',
          '<': '&lt;',
          '>': '&gt;',
          '"': '&quot;',
          "'": '&#039;'
     };

     return text.replace(/[&<>"']/g, (m) => map[m]);
}

function cleanHtml(html: string) {
     // Supprimer les balises script et style
     html = html.replace(/<script[^>]*>?[\s\S]*?<\/script>/gi, '');
     html = html.replace(/<style[^>]*>?[\s\S]*?<\/style>/gi, '');

     // Supprimer les attributs dangereux
     html = html.replace(/on\w+="[^"]*"/gi, '');

     // Échapper les caractères spéciaux
     html = escapeHtml(html);

     return html;
}

export function linkify(text: string) {
     const urlRegex = /(https?:\/\/[^\s]+)/g;
     const cleanedText = cleanHtml(text);
     return cleanedText.replace(urlRegex, (match) => {
          return `<a href="${match}" target="_blank">${match}</a>`;
     });
}

export function matchYoutubeUrl(url: string) {
     const p = /(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?/g;
     const match = url.match(p);
     if (match && match.length > 0) {
          const idPattern = /((\w|-){11})/;
          const idMatch = match[0].match(idPattern);
          if (idMatch && idMatch[1]) {
               return `<a href="${match[0]}" target="_blank">
                         <img
                              src="//img.youtube.com/vi/${idMatch[1]}/0.jpg"
                              alt="Youtube vidéo"
                              class="w-full"
                                   />
                         </a>`
               // return idMatch[1];
          }
     }
     return false;
}

export async function getYoutubeData(url: string) {
     const p = /(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?/g;
     const match = url.match(p);
     if (match) {
          const response = await fetch(`https://noembed.com/embed?dataType=json&url=${match[0]}`)
               .then((res) => res.json())
               .then((data) => { return data });

          return `
          <div class="bg-surface-500 pt-2 rounded-xl overflow-hidden">
               <a href="${response.url}" target="_blank">
                    <h5 class="text-tertiary-500 text-center font-bold text-sm">${response.title}</h5>
                    <img
                         src="${response.thumbnail_url}"
                         alt="Youtube vidéo"
                         class="w-full"
                    />
               </a>
          </div>`
     }else{
          return false
     }
}


