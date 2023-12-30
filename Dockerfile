FROM postgres:latest
VOLUME /var/lib/postgresql/data

ENV POSTGRES_USER dbadmin
ENV POSTGRES_PASSWORD 123456
ENV POSTGRES_DB easy-up

EXPOSE 5432

CMD ["postgres"]
