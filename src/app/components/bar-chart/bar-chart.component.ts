import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-bar-chart',
  standalone: true,
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements AfterViewInit {
  @ViewChild('chart') chartContainer!: ElementRef;
  @ViewChild('dataInput') dataInput!: ElementRef;

  private svg!: d3.Selection<SVGSVGElement, unknown, null, undefined>;
  private readonly colors = ['#e63946', '#f4a261', '#2a9d8f', '#264653', '#8ecae6'];
  private readonly width = 600;
  private readonly barHeight = 30;
  private readonly padding = 5;

  ngAfterViewInit() {
    this.svg = d3.select(this.chartContainer.nativeElement)
      .append('svg')
      .attr('width', this.width);
  }

  updateChart(): void {
    const data = this.getValidatedData();
    if (!data) return;

    this.renderChart(data);
  }

  private getValidatedData(): number[] | null {
    const inputData: string = this.dataInput.nativeElement.value.trim();

    if (!inputData) {
      alert('Error: Debes ingresar al menos un número.');
      return null;
    }

    const data: number[] = inputData
      .split(',')
      .map(d => d.trim())
      .filter(d => d !== '') // Eliminar espacios vacíos
      .map(Number)
      .filter(d => !isNaN(d) && d >= 0); // Filtrar solo números válidos y positivos

    if (data.length === 0) {
      alert('Error: Ingresa solo números enteros positivos separados por comas.');
      return null;
    }

    return data;
  }

  private renderChart(data: number[]): void {
    this.svg.selectAll('*').remove(); // Limpiar gráfico
    this.svg.attr('height', data.length * (this.barHeight + this.padding));

    const maxValue = d3.max(data) ?? 1;
    const xScale = d3.scaleLinear().domain([0, maxValue]).range([0, this.width - 50]);

    // Dibujar barras
    this.svg.selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', 0)
      .attr('y', (_, i) => i * (this.barHeight + this.padding))
      .attr('width', d => xScale(d))
      .attr('height', this.barHeight)
      .attr('fill', (_, i) => this.colors[i % this.colors.length]);

    // Agregar etiquetas numéricas
    this.svg.selectAll('text')
      .data(data)
      .enter()
      .append('text')
      .attr('x', d => xScale(d) + 5)
      .attr('y', (_, i) => i * (this.barHeight + this.padding) + this.barHeight / 2)
      .attr('dy', '.35em')
      .text(d => d)
      .attr('fill', 'black')
      .attr('font-size', '12px')
      .attr('font-weight', 'bold');
  }
}
