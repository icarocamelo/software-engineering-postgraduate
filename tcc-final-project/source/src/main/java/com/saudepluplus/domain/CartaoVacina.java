package com.saudepluplus.domain;


import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A CartaoVacina.
 */
@Entity
@Table(name = "cartao_vacina")
public class CartaoVacina implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @OneToMany(mappedBy = "cartaoVacina")
    private Set<Vacina> vacinas = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Set<Vacina> getVacinas() {
        return vacinas;
    }

    public CartaoVacina vacinas(Set<Vacina> vacinas) {
        this.vacinas = vacinas;
        return this;
    }

    public CartaoVacina addVacina(Vacina vacina) {
        this.vacinas.add(vacina);
        vacina.setCartaoVacina(this);
        return this;
    }

    public CartaoVacina removeVacina(Vacina vacina) {
        this.vacinas.remove(vacina);
        vacina.setCartaoVacina(null);
        return this;
    }

    public void setVacinas(Set<Vacina> vacinas) {
        this.vacinas = vacinas;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof CartaoVacina)) {
            return false;
        }
        return id != null && id.equals(((CartaoVacina) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "CartaoVacina{" +
            "id=" + getId() +
            "}";
    }
}
