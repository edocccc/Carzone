package com.polimi.carzone.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AppuntamentoManagerResponseDTO {
    private long id;
    private LocalDateTime dataOra;
    private String nomeCliente;
    private String cognomeCliente;
    private String nomeDipendente;
    private String cognomeDipendente;
    private String targaVeicolo;
    private String marcaVeicolo;
    private String modelloVeicolo;
    private boolean esitoRegistrato;
    private boolean dataPassata;
}