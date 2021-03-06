import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { Appointment } from '../Appointment';
import { AppointmentsService } from '../appointments.service';
import { mergeMap } from 'rxjs/operators'
import { error } from '@angular/compiler/src/util';


@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.css']
})
export class AppointmentListComponent implements OnInit {
  
  public loading = true;
  public errMsg?: string;
  public successMsg?: string;
  public appointments!: Appointment[];
  public columns = ['appointmentDate', 'name', 'email', 'cancel'];

  constructor(private appointmentService: AppointmentsService) { }

  ngOnInit(): void {
    this.appointmentService.getAppointments()
      .subscribe((appointments: Appointment[]) => {
        this.appointments = appointments;
        this.loading = false;
      },
      (error: ErrorEvent) => {
        this.errMsg = error.error.message;
        this.loading = false;
      });
  }

  cancelAppointment(id: string) {
     this.appointmentService.cancelAppointment(id)
      .pipe(
        mergeMap(() => this.appointmentService.getAppointments())
      )
      .subscribe((appointments: Appointment[]) => {
        this.appointments = appointments;
        this.successMsg = 'Successfully cancelled the appointment'
      },
      (error: ErrorEvent) => {
        this.errMsg = error.error.message;
      });
  }
}
