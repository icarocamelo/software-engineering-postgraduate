package com.saudepluplus.domain;


import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;

/**
 * A Paciente.
 */
@Entity
@Table(name = "paciente")
public class Paciente implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "nome")
    private String nome;

    @Column(name = "r_g")
    private String rG;

    @Column(name = "c_pf")
    private String cPF;

    @Column(name = "data_nascimento")
    private LocalDate dataNascimento;

    @Column(name = "telefone")
    private String telefone;

    @Column(name = "peso")
    private Double peso;

    @Column(name = "altura")
    private Double altura;

    @Column(name = "responsavel")
    private String responsavel;

    @Column(name = "r_ne")
    private String rNE;

    @OneToOne
    @JoinColumn(unique = true)
    private PerfilAcesso perfilAcesso;

    @OneToOne
    @JoinColumn(unique = true)
    private Endereco endereco;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public Paciente nome(String nome) {
        this.nome = nome;
        return this;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getrG() {
        return rG;
    }

    public Paciente rG(String rG) {
        this.rG = rG;
        return this;
    }

    public void setrG(String rG) {
        this.rG = rG;
    }

    public String getcPF() {
        return cPF;
    }

    public Paciente cPF(String cPF) {
        this.cPF = cPF;
        return this;
    }

    public void setcPF(String cPF) {
        this.cPF = cPF;
    }

    public LocalDate getDataNascimento() {
        return dataNascimento;
    }

    public Paciente dataNascimento(LocalDate dataNascimento) {
        this.dataNascimento = dataNascimento;
        return this;
    }

    public void setDataNascimento(LocalDate dataNascimento) {
        this.dataNascimento = dataNascimento;
    }

    public String getTelefone() {
        return telefone;
    }

    public Paciente telefone(String telefone) {
        this.telefone = telefone;
        return this;
    }

    public void setTelefone(String telefone) {
        this.telefone = telefone;
    }

    public Double getPeso() {
        return peso;
    }

    public Paciente peso(Double peso) {
        this.peso = peso;
        return this;
    }

    public void setPeso(Double peso) {
        this.peso = peso;
    }

    public Double getAltura() {
        return altura;
    }

    public Paciente altura(Double altura) {
        this.altura = altura;
        return this;
    }

    public void setAltura(Double altura) {
        this.altura = altura;
    }

    public String getResponsavel() {
        return responsavel;
    }

    public Paciente responsavel(String responsavel) {
        this.responsavel = responsavel;
        return this;
    }

    public void setResponsavel(String responsavel) {
        this.responsavel = responsavel;
    }

    public String getrNE() {
        return rNE;
    }

    public Paciente rNE(String rNE) {
        this.rNE = rNE;
        return this;
    }

    public void setrNE(String rNE) {
        this.rNE = rNE;
    }

    public PerfilAcesso getPerfilAcesso() {
        return perfilAcesso;
    }

    public Paciente perfilAcesso(PerfilAcesso perfilAcesso) {
        this.perfilAcesso = perfilAcesso;
        return this;
    }

    public void setPerfilAcesso(PerfilAcesso perfilAcesso) {
        this.perfilAcesso = perfilAcesso;
    }

    public Endereco getEndereco() {
        return endereco;
    }

    public Paciente endereco(Endereco endereco) {
        this.endereco = endereco;
        return this;
    }

    public void setEndereco(Endereco endereco) {
        this.endereco = endereco;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Paciente)) {
            return false;
        }
        return id != null && id.equals(((Paciente) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Paciente{" +
            "id=" + getId() +
            ", nome='" + getNome() + "'" +
            ", rG='" + getrG() + "'" +
            ", cPF='" + getcPF() + "'" +
            ", dataNascimento='" + getDataNascimento() + "'" +
            ", telefone='" + getTelefone() + "'" +
            ", peso=" + getPeso() +
            ", altura=" + getAltura() +
            ", responsavel='" + getResponsavel() + "'" +
            ", rNE='" + getrNE() + "'" +
            "}";
    }
}
