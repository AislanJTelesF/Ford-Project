import { Component, OnInit } from '@angular/core';
import { SideBar } from '../../side-bar/side-bar';
import { DashboardService } from '../../services/dashboard';
import { Veiculo } from '../../models/veiculo.model';
import { VehicleData } from '../../models/vehicleData.model';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [SideBar, ReactiveFormsModule, CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  vehicles: Veiculo[] = [];
  selectedVehicle!: Veiculo;
  vehicleData!: VehicleData;

  selectCarForms = new FormGroup({
    carId: new FormControl(''),
  });

  constructor(private dashboardservice: DashboardService) {}
  ngOnInit(): void {
    this.dashboardservice.getVehicles().subscribe((res) => {
      console.log(res.vehicles);
      this.vehicles = res.vehicles;
    });

    this.selectCarForms.controls.carId.valueChanges.subscribe((id) => {
      this.selectedVehicle = this.vehicles[Number(id) - 1];
      console.log(this.selectedVehicle);
    });
  }
}
