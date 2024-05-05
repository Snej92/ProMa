import {Component, Input} from '@angular/core';
import {projectView, projectViewModel} from "../store/project-administration.model";

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrl: './project-card.component.scss'
})
export class ProjectCardComponent {
  @Input() projectView: projectViewModel | undefined;

}
