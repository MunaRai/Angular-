import { Pipe, PipeTransform } from '@angular/core';
import { NavLink } from '@shared/models/nav-link.model';

@Pipe({
  name: 'navLinksFilter'
})
export class NavLinksFilterPipe implements PipeTransform {

  transform(links: NavLink[], role: string): NavLink[] {
    const filteredLinks = links.filter(link => {
      return link.permissions.includes('ALL') || link.permissions.includes(role);
    });
    return filteredLinks;
  }

}
