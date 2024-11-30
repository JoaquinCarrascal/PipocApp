import { Component, OnInit } from '@angular/core';
import { PeopleService } from '../../services/people.service';
import { PersonDetailsResponse } from '../../models/person-details-interface';
import { ActivatedRoute } from '@angular/router';
import { CombinedCreditsResponse } from '../../models/combined-credits';

@Component({
  selector: 'app-person-details',
  templateUrl: './person-details.component.html',
  styleUrls: ['./person-details.component.css']
})
export class PersonDetailsComponent implements OnInit {

  person: PersonDetailsResponse | undefined;
  credits: any[] = []; // Almacena los créditos combinados
  personImageUrl: string | undefined;
  socialLinks: { icon: string; url: string }[] = [];
  knownFor: { id: number; title: string; release_date: string; first_air_date?: string; poster_path: string | null }[] = [];
  lang = localStorage.getItem('lang') || 'es-ES';

  constructor(private peopleService: PeopleService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.getPersonDetails(id);
      this.getPersonCombinedCredits(id);
      this.getPersonImages(id);
      this.getPersonExternalIds(id);
    }
  }

  getPersonDetails(id: number) {
    this.peopleService.getPersonDetails(id).subscribe((data) => {
      this.person = data;
    });
  }

  getPersonCombinedCredits(id: number) {
    this.peopleService.getPersonCombinedCredits(id).subscribe((data: CombinedCreditsResponse) => {
      if (data && data.cast) {
        // Filtra y toma los primeros 5 elementos
        this.knownFor = data.cast
          .filter(item => item.title || item.name) // Asegúrate de que tengan un título o nombre
          .slice(0, 5) // Limita a 5 resultados
          .map(item => ({
            id: item.id,
            title: item.title || item.name || 'Sin título', // Usa 'title' para películas y 'name' para series
            release_date: item.release_date || item.first_air_date || 'Desconocido', // Prioriza la fecha disponible
            first_air_date: item.first_air_date,
            poster_path: item.poster_path, // Imagen de portada
          }));
      }
    });
  }

  getPersonImages(id: number): void {
    this.peopleService.getPersonImages(id).subscribe((data: any) => {
      if (data.profiles && data.profiles.length > 0) {
        this.personImageUrl = `https://image.tmdb.org/t/p/original${data.profiles[0].file_path}`;
      }
    });
  }

  getPersonExternalIds(id: number) {
    this.peopleService.getPersonExternalIds(id).subscribe((data: any) => {
      const platforms = {
        facebook_id: { icon: 'bi bi-facebook', url: (id: string) => `https://facebook.com/${id}` },
        instagram_id: { icon: 'bi bi-instagram', url: (id: string) => `https://instagram.com/${id}` },
        tiktok_id: { icon: 'bi bi-tiktok', url: (id: string) => `https://tiktok.com/@${id}` },
        twitter_id: { icon: 'bi bi-twitter', url: (id: string) => `https://twitter.com/${id}` },
        youtube_id: { icon: 'bi bi-youtube', url: (id: string) => `https://youtube.com/${id}` },
      };

      this.socialLinks = (Object.keys(platforms) as (keyof typeof platforms)[])
        .filter((key) => data[key])
        .map((key) => ({
          icon: platforms[key].icon,
          url: platforms[key].url(data[key] as string),
        }));
    });
  }
}
