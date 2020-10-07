package com.saudepluplus.domain;


import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A PerfilAcesso.
 */
@Entity
@Table(name = "perfil_acesso")
public class PerfilAcesso implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "nome")
    private String nome;

    @OneToMany(mappedBy = "perfilAcesso")
    private Set<Permissao> permissoes = new HashSet<>();

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

    public PerfilAcesso nome(String nome) {
        this.nome = nome;
        return this;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public Set<Permissao> getPermissoes() {
        return permissoes;
    }

    public PerfilAcesso permissoes(Set<Permissao> permissaos) {
        this.permissoes = permissaos;
        return this;
    }

    public PerfilAcesso addPermissoes(Permissao permissao) {
        this.permissoes.add(permissao);
        permissao.setPerfilAcesso(this);
        return this;
    }

    public PerfilAcesso removePermissoes(Permissao permissao) {
        this.permissoes.remove(permissao);
        permissao.setPerfilAcesso(null);
        return this;
    }

    public void setPermissoes(Set<Permissao> permissaos) {
        this.permissoes = permissaos;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof PerfilAcesso)) {
            return false;
        }
        return id != null && id.equals(((PerfilAcesso) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "PerfilAcesso{" +
            "id=" + getId() +
            ", nome='" + getNome() + "'" +
            "}";
    }
}
