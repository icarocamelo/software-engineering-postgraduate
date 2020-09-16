package com.saudepluplus.domain;


import javax.persistence.*;

import java.io.Serializable;

/**
 * A Profissional.
 */
@Entity
@Table(name = "profissional")
public class Profissional implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "u_uid")
    private String uUID;

    @Column(name = "nome")
    private String nome;

    @Column(name = "r_g")
    private String rG;

    @Column(name = "c_pf")
    private String cPF;

    @OneToOne
    @JoinColumn(unique = true)
    private PerfilAcesso perfilAcesso;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getuUID() {
        return uUID;
    }

    public Profissional uUID(String uUID) {
        this.uUID = uUID;
        return this;
    }

    public void setuUID(String uUID) {
        this.uUID = uUID;
    }

    public String getNome() {
        return nome;
    }

    public Profissional nome(String nome) {
        this.nome = nome;
        return this;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getrG() {
        return rG;
    }

    public Profissional rG(String rG) {
        this.rG = rG;
        return this;
    }

    public void setrG(String rG) {
        this.rG = rG;
    }

    public String getcPF() {
        return cPF;
    }

    public Profissional cPF(String cPF) {
        this.cPF = cPF;
        return this;
    }

    public void setcPF(String cPF) {
        this.cPF = cPF;
    }

    public PerfilAcesso getPerfilAcesso() {
        return perfilAcesso;
    }

    public Profissional perfilAcesso(PerfilAcesso perfilAcesso) {
        this.perfilAcesso = perfilAcesso;
        return this;
    }

    public void setPerfilAcesso(PerfilAcesso perfilAcesso) {
        this.perfilAcesso = perfilAcesso;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Profissional)) {
            return false;
        }
        return id != null && id.equals(((Profissional) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Profissional{" +
            "id=" + getId() +
            ", uUID='" + getuUID() + "'" +
            ", nome='" + getNome() + "'" +
            ", rG='" + getrG() + "'" +
            ", cPF='" + getcPF() + "'" +
            "}";
    }
}
