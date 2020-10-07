package com.saudepluplus.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A Procedimento.
 */
@Entity
@Table(name = "procedimento")
public class Procedimento implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "descricao")
    private String descricao;

    @Column(name = "preco")
    private Double preco;

    @Column(name = "codigo")
    private String codigo;

    @OneToOne
    @JoinColumn(unique = true)
    private Paciente paciente;

    @OneToOne
    @JoinColumn(unique = true)
    private ProfissionalDeSaude profissionalDeSaude;

    @OneToOne
    @JoinColumn(unique = true)
    private Endereco endereco;

    @OneToOne
    @JoinColumn(unique = true)
    private Agenda agenda;

    @ManyToOne
    @JsonIgnoreProperties(value = "procedimentos", allowSetters = true)
    private Prontuario prontuario;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescricao() {
        return descricao;
    }

    public Procedimento descricao(String descricao) {
        this.descricao = descricao;
        return this;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public Double getPreco() {
        return preco;
    }

    public Procedimento preco(Double preco) {
        this.preco = preco;
        return this;
    }

    public void setPreco(Double preco) {
        this.preco = preco;
    }

    public String getCodigo() {
        return codigo;
    }

    public Procedimento codigo(String codigo) {
        this.codigo = codigo;
        return this;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public Paciente getPaciente() {
        return paciente;
    }

    public Procedimento paciente(Paciente paciente) {
        this.paciente = paciente;
        return this;
    }

    public void setPaciente(Paciente paciente) {
        this.paciente = paciente;
    }

    public ProfissionalDeSaude getProfissionalDeSaude() {
        return profissionalDeSaude;
    }

    public Procedimento profissionalDeSaude(ProfissionalDeSaude profissionalDeSaude) {
        this.profissionalDeSaude = profissionalDeSaude;
        return this;
    }

    public void setProfissionalDeSaude(ProfissionalDeSaude profissionalDeSaude) {
        this.profissionalDeSaude = profissionalDeSaude;
    }

    public Endereco getEndereco() {
        return endereco;
    }

    public Procedimento endereco(Endereco endereco) {
        this.endereco = endereco;
        return this;
    }

    public void setEndereco(Endereco endereco) {
        this.endereco = endereco;
    }

    public Agenda getAgenda() {
        return agenda;
    }

    public Procedimento agenda(Agenda agenda) {
        this.agenda = agenda;
        return this;
    }

    public void setAgenda(Agenda agenda) {
        this.agenda = agenda;
    }

    public Prontuario getProntuario() {
        return prontuario;
    }

    public Procedimento prontuario(Prontuario prontuario) {
        this.prontuario = prontuario;
        return this;
    }

    public void setProntuario(Prontuario prontuario) {
        this.prontuario = prontuario;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Procedimento)) {
            return false;
        }
        return id != null && id.equals(((Procedimento) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Procedimento{" +
            "id=" + getId() +
            ", descricao='" + getDescricao() + "'" +
            ", preco=" + getPreco() +
            ", codigo='" + getCodigo() + "'" +
            "}";
    }
}
