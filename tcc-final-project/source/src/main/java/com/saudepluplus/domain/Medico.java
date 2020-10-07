package com.saudepluplus.domain;


import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Medico.
 */
@Entity
@Table(name = "medico")
public class Medico implements Serializable {

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

    @Column(name = "numero_registro")
    private String numeroRegistro;

    @OneToMany(mappedBy = "medico")
    private Set<Agenda> agenda = new HashSet<>();

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

    public Medico nome(String nome) {
        this.nome = nome;
        return this;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getrG() {
        return rG;
    }

    public Medico rG(String rG) {
        this.rG = rG;
        return this;
    }

    public void setrG(String rG) {
        this.rG = rG;
    }

    public String getcPF() {
        return cPF;
    }

    public Medico cPF(String cPF) {
        this.cPF = cPF;
        return this;
    }

    public void setcPF(String cPF) {
        this.cPF = cPF;
    }

    public String getNumeroRegistro() {
        return numeroRegistro;
    }

    public Medico numeroRegistro(String numeroRegistro) {
        this.numeroRegistro = numeroRegistro;
        return this;
    }

    public void setNumeroRegistro(String numeroRegistro) {
        this.numeroRegistro = numeroRegistro;
    }

    public Set<Agenda> getAgenda() {
        return agenda;
    }

    public Medico agenda(Set<Agenda> agenda) {
        this.agenda = agenda;
        return this;
    }

    public Medico addAgenda(Agenda agenda) {
        this.agenda.add(agenda);
        agenda.setMedico(this);
        return this;
    }

    public Medico removeAgenda(Agenda agenda) {
        this.agenda.remove(agenda);
        agenda.setMedico(null);
        return this;
    }

    public void setAgenda(Set<Agenda> agenda) {
        this.agenda = agenda;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Medico)) {
            return false;
        }
        return id != null && id.equals(((Medico) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Medico{" +
            "id=" + getId() +
            ", nome='" + getNome() + "'" +
            ", rG='" + getrG() + "'" +
            ", cPF='" + getcPF() + "'" +
            ", numeroRegistro='" + getNumeroRegistro() + "'" +
            "}";
    }
}
