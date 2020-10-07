package com.saudepluplus.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Prontuario.
 */
@Entity
@Table(name = "prontuario")
public class Prontuario implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @OneToOne
    @JoinColumn(unique = true)
    private Paciente paciente;

    @OneToMany(mappedBy = "prontuario")
    private Set<Atendimento> atendimentos = new HashSet<>();

    @OneToMany(mappedBy = "prontuario")
    private Set<Procedimento> procedimentos = new HashSet<>();

    @ManyToOne
    @JsonIgnoreProperties(value = "prontuarios", allowSetters = true)
    private ProfissionalDeSaude profissionalDeSaude;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Paciente getPaciente() {
        return paciente;
    }

    public Prontuario paciente(Paciente paciente) {
        this.paciente = paciente;
        return this;
    }

    public void setPaciente(Paciente paciente) {
        this.paciente = paciente;
    }

    public Set<Atendimento> getAtendimentos() {
        return atendimentos;
    }

    public Prontuario atendimentos(Set<Atendimento> atendimentos) {
        this.atendimentos = atendimentos;
        return this;
    }

    public Prontuario addAtendimentos(Atendimento atendimento) {
        this.atendimentos.add(atendimento);
        atendimento.setProntuario(this);
        return this;
    }

    public Prontuario removeAtendimentos(Atendimento atendimento) {
        this.atendimentos.remove(atendimento);
        atendimento.setProntuario(null);
        return this;
    }

    public void setAtendimentos(Set<Atendimento> atendimentos) {
        this.atendimentos = atendimentos;
    }

    public Set<Procedimento> getProcedimentos() {
        return procedimentos;
    }

    public Prontuario procedimentos(Set<Procedimento> procedimentos) {
        this.procedimentos = procedimentos;
        return this;
    }

    public Prontuario addProcedimentos(Procedimento procedimento) {
        this.procedimentos.add(procedimento);
        procedimento.setProntuario(this);
        return this;
    }

    public Prontuario removeProcedimentos(Procedimento procedimento) {
        this.procedimentos.remove(procedimento);
        procedimento.setProntuario(null);
        return this;
    }

    public void setProcedimentos(Set<Procedimento> procedimentos) {
        this.procedimentos = procedimentos;
    }

    public ProfissionalDeSaude getProfissionalDeSaude() {
        return profissionalDeSaude;
    }

    public Prontuario profissionalDeSaude(ProfissionalDeSaude profissionalDeSaude) {
        this.profissionalDeSaude = profissionalDeSaude;
        return this;
    }

    public void setProfissionalDeSaude(ProfissionalDeSaude profissionalDeSaude) {
        this.profissionalDeSaude = profissionalDeSaude;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Prontuario)) {
            return false;
        }
        return id != null && id.equals(((Prontuario) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Prontuario{" +
            "id=" + getId() +
            "}";
    }
}
