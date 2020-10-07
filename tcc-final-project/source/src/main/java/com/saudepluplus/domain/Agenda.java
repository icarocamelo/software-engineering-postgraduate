package com.saudepluplus.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;

/**
 * A Agenda.
 */
@Entity
@Table(name = "agenda")
public class Agenda implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "data")
    private LocalDate data;

    @ManyToOne
    @JsonIgnoreProperties(value = "agenda", allowSetters = true)
    private Medico medico;

    @ManyToOne
    @JsonIgnoreProperties(value = "agenda", allowSetters = true)
    private Fisioterapeuta fisioterapeuta;

    @ManyToOne
    @JsonIgnoreProperties(value = "agenda", allowSetters = true)
    private Enfermeiro enfermeiro;

    @ManyToOne
    @JsonIgnoreProperties(value = "agenda", allowSetters = true)
    private Psicologo psicologo;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getData() {
        return data;
    }

    public Agenda data(LocalDate data) {
        this.data = data;
        return this;
    }

    public void setData(LocalDate data) {
        this.data = data;
    }

    public Medico getMedico() {
        return medico;
    }

    public Agenda medico(Medico medico) {
        this.medico = medico;
        return this;
    }

    public void setMedico(Medico medico) {
        this.medico = medico;
    }

    public Fisioterapeuta getFisioterapeuta() {
        return fisioterapeuta;
    }

    public Agenda fisioterapeuta(Fisioterapeuta fisioterapeuta) {
        this.fisioterapeuta = fisioterapeuta;
        return this;
    }

    public void setFisioterapeuta(Fisioterapeuta fisioterapeuta) {
        this.fisioterapeuta = fisioterapeuta;
    }

    public Enfermeiro getEnfermeiro() {
        return enfermeiro;
    }

    public Agenda enfermeiro(Enfermeiro enfermeiro) {
        this.enfermeiro = enfermeiro;
        return this;
    }

    public void setEnfermeiro(Enfermeiro enfermeiro) {
        this.enfermeiro = enfermeiro;
    }

    public Psicologo getPsicologo() {
        return psicologo;
    }

    public Agenda psicologo(Psicologo psicologo) {
        this.psicologo = psicologo;
        return this;
    }

    public void setPsicologo(Psicologo psicologo) {
        this.psicologo = psicologo;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Agenda)) {
            return false;
        }
        return id != null && id.equals(((Agenda) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Agenda{" +
            "id=" + getId() +
            ", data='" + getData() + "'" +
            "}";
    }
}
