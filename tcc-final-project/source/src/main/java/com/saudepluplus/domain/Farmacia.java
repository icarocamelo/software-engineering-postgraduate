package com.saudepluplus.domain;


import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Farmacia.
 */
@Entity
@Table(name = "farmacia")
public class Farmacia implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "u_uid")
    private String uUID;

    @OneToMany(mappedBy = "farmacia")
    private Set<Medicamento> medicamentos = new HashSet<>();

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

    public Farmacia uUID(String uUID) {
        this.uUID = uUID;
        return this;
    }

    public void setuUID(String uUID) {
        this.uUID = uUID;
    }

    public Set<Medicamento> getMedicamentos() {
        return medicamentos;
    }

    public Farmacia medicamentos(Set<Medicamento> medicamentos) {
        this.medicamentos = medicamentos;
        return this;
    }

    public Farmacia addMedicamentos(Medicamento medicamento) {
        this.medicamentos.add(medicamento);
        medicamento.setFarmacia(this);
        return this;
    }

    public Farmacia removeMedicamentos(Medicamento medicamento) {
        this.medicamentos.remove(medicamento);
        medicamento.setFarmacia(null);
        return this;
    }

    public void setMedicamentos(Set<Medicamento> medicamentos) {
        this.medicamentos = medicamentos;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Farmacia)) {
            return false;
        }
        return id != null && id.equals(((Farmacia) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Farmacia{" +
            "id=" + getId() +
            ", uUID='" + getuUID() + "'" +
            "}";
    }
}
