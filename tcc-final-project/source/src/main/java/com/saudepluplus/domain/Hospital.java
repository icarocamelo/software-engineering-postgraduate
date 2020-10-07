package com.saudepluplus.domain;


import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Hospital.
 */
@Entity
@Table(name = "hospital")
public class Hospital implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "nome")
    private String nome;

    @OneToMany(mappedBy = "hospital")
    private Set<Leito> leitos = new HashSet<>();

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

    public Hospital nome(String nome) {
        this.nome = nome;
        return this;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public Set<Leito> getLeitos() {
        return leitos;
    }

    public Hospital leitos(Set<Leito> leitos) {
        this.leitos = leitos;
        return this;
    }

    public Hospital addLeitos(Leito leito) {
        this.leitos.add(leito);
        leito.setHospital(this);
        return this;
    }

    public Hospital removeLeitos(Leito leito) {
        this.leitos.remove(leito);
        leito.setHospital(null);
        return this;
    }

    public void setLeitos(Set<Leito> leitos) {
        this.leitos = leitos;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Hospital)) {
            return false;
        }
        return id != null && id.equals(((Hospital) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Hospital{" +
            "id=" + getId() +
            ", nome='" + getNome() + "'" +
            "}";
    }
}
